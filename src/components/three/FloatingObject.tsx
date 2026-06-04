'use client'

import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import {
  FALLBACK_MODEL,
  getServiceModelConfig,
  type ServiceSectionId,
  type ServiceModelSide,
} from '@/lib/service-models'

gsap.registerPlugin(ScrollTrigger)

export type FloatingObjectProps = {
  modelPath: string
  side: ServiceModelSide
  sectionId: ServiceSectionId
  scrollSpeed?: number
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.3} color="#1A1614" />
      <directionalLight
        position={[3, 5, 2]}
        intensity={2.2}
        color="#E8C9A0"
        castShadow
      />
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.6}
        color="#2A1840"
      />
      <pointLight
        position={[0, 4, 2]}
        intensity={1.5}
        color="#E8C9A0"
        distance={10}
      />
      <pointLight
        position={[2, 0, 3]}
        intensity={0.8}
        color="#B89968"
        distance={8}
      />
    </>
  )
}

function applyChampagneMaterial(scene: THREE.Object3D) {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#C8A870'),
        metalness: 0.08,
        roughness: 0.35,
        transmission: 0.75,
        thickness: 1.2,
        envMapIntensity: 1.2,
        transparent: true,
        opacity: 0.88,
      })
      child.castShadow = true
      child.receiveShadow = true
    }
  })
}

function computeNormalizedScale(scene: THREE.Object3D, targetSize = 2): number {
  const box = new THREE.Box3().setFromObject(scene)
  const size = new THREE.Vector3()
  box.getSize(size)
  const maxDim = Math.max(size.x, size.y, size.z)
  return maxDim > 0 ? targetSize / maxDim : 1
}

type ServiceModelProps = {
  modelPath: string
  sectionId: ServiceSectionId
  animating: boolean
}

function ServiceModel({ modelPath, sectionId, animating }: ServiceModelProps) {
  const config = getServiceModelConfig(sectionId)
  const [resolvedPath, setResolvedPath] = useState(modelPath)

  useEffect(() => {
    let cancelled = false
    fetch(modelPath, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled) {
          setResolvedPath(res.ok ? modelPath : FALLBACK_MODEL)
        }
      })
      .catch(() => {
        if (!cancelled) setResolvedPath(FALLBACK_MODEL)
      })
    return () => {
      cancelled = true
    }
  }, [modelPath])

  const { scene } = useGLTF(resolvedPath)
  const groupRef = useRef<THREE.Group>(null)
  const clonedScene = useMemo(() => scene.clone(), [scene])

  const { scale, position, rotation } = useMemo(() => {
    const isFallback = resolvedPath === FALLBACK_MODEL
    const baseScale = computeNormalizedScale(clonedScene, isFallback ? 1.6 : 2)
    const mult = isFallback && config ? config.fallbackScale / 2 : 1
    const rot = isFallback && config ? config.fallbackRotation : [0, 0, 0]
    return {
      scale: baseScale * mult,
      position: [0, -0.35, 0] as [number, number, number],
      rotation: rot as [number, number, number],
    }
  }, [clonedScene, resolvedPath, config])

  useLayoutEffect(() => {
    applyChampagneMaterial(clonedScene)
  }, [clonedScene])

  useFrame((state) => {
    if (!animating || !groupRef.current) return
    groupRef.current.rotation.y += 0.002
    groupRef.current.position.y =
      -0.35 + Math.sin(state.clock.elapsedTime * 0.5) * 0.04
  })

  return (
    <group
      ref={groupRef}
      scale={[scale, scale, scale]}
      position={position}
      rotation={rotation}
    >
      <primitive object={clonedScene} />
    </group>
  )
}

function FloatingCanvas({
  modelPath,
  sectionId,
  visible,
  onReady,
}: {
  modelPath: string
  sectionId: ServiceSectionId
  visible: boolean
  onReady?: () => void
}) {
  useEffect(() => {
    onReady?.()
  }, [onReady])

  return (
    <Canvas
      className="floating-object-canvas"
      camera={{ position: [0, 0, 5], fov: 35 }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      frameloop={visible ? 'always' : 'never'}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
    >
      <Suspense fallback={null}>
        <Lighting />
        <ServiceModel
          key={modelPath}
          modelPath={modelPath}
          sectionId={sectionId}
          animating={visible}
        />
        <Environment preset="studio" />
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.35}
          scale={5}
          blur={2.5}
          color="#E8C9A0"
        />
      </Suspense>
    </Canvas>
  )
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = () => setReduced(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

function refreshScrollTriggers() {
  requestAnimationFrame(() => ScrollTrigger.refresh())
}

export default function FloatingObject({
  modelPath,
  sectionId,
  scrollSpeed = 0.15,
}: FloatingObjectProps) {
  const animRef = useRef<HTMLDivElement>(null)
  const [shouldMount, setShouldMount] = useState(false)
  const [inView, setInView] = useState(false)
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReduced) return
    const section = document.getElementById(sectionId)
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const near = entry.isIntersecting
        if (near) setShouldMount(true)
        setInView(near)
      },
      { rootMargin: '200px', threshold: 0.05 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [sectionId, prefersReduced])

  useEffect(() => {
    if (!shouldMount || prefersReduced) return
    useGLTF.preload(modelPath)
    fetch(modelPath, { method: 'HEAD' })
      .then((res) => {
        if (!res.ok) useGLTF.preload(FALLBACK_MODEL)
      })
      .catch(() => useGLTF.preload(FALLBACK_MODEL))
  }, [shouldMount, modelPath, prefersReduced])

  useLayoutEffect(() => {
    if (prefersReduced) return

    const animEl = animRef.current
    const trigger = document.getElementById(sectionId)
    if (!animEl || !trigger) return

    const ctx = gsap.context(() => {
      gsap.set(animEl, {
        autoAlpha: 0,
        scale: 0.95,
        rotation: -2,
        y: 0,
        force3D: true,
      })

      const parallaxY = 80 * scrollSpeed

      gsap
        .timeline({
          scrollTrigger: {
            trigger,
            start: 'top 82%',
            end: 'bottom 18%',
            scrub: 1,
            invalidateOnRefresh: true,
          },
          defaults: { ease: 'none' },
        })
        .to(animEl, {
          autoAlpha: 1,
          scale: 1,
          rotation: 0,
          y: parallaxY * 0.25,
          duration: 0.18,
          ease: 'power2.out',
        })
        .to(animEl, {
          rotation: 2,
          y: parallaxY,
          duration: 0.64,
        })
        .to(animEl, {
          autoAlpha: 0,
          scale: 0.95,
          rotation: 3,
          duration: 0.18,
          ease: 'power2.in',
        })
    }, animRef)

    refreshScrollTriggers()
    const t1 = window.setTimeout(refreshScrollTriggers, 400)
    const t2 = window.setTimeout(refreshScrollTriggers, 1200)

    const onLoad = () => refreshScrollTriggers()
    window.addEventListener('load', onLoad)
    window.addEventListener('resize', refreshScrollTriggers)

    const images = trigger.querySelectorAll('img')
    const onImgLoad = () => refreshScrollTriggers()
    images.forEach((img) => {
      if (!img.complete) img.addEventListener('load', onImgLoad)
    })

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('load', onLoad)
      window.removeEventListener('resize', refreshScrollTriggers)
      images.forEach((img) => img.removeEventListener('load', onImgLoad))
      ctx.revert()
    }
  }, [sectionId, scrollSpeed, prefersReduced])

  useEffect(() => {
    if (shouldMount) refreshScrollTriggers()
  }, [shouldMount])

  if (prefersReduced) return null

  return (
    <div ref={animRef} className="floating-object-anim">
      {shouldMount && (
        <FloatingCanvas
          modelPath={modelPath}
          sectionId={sectionId}
          visible={inView}
          onReady={refreshScrollTriggers}
        />
      )}
    </div>
  )
}
