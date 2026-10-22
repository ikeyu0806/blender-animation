import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function FireStage({ model, playing }) {
  const host = useRef(null);
  const runtime = useRef(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const container = host.current;
    let disposed = false;
    let frameId = 0;
    let gltfScene;
    let mixer;
    let controls;
    let resizeObserver;
    let intersectionObserver;
    let renderer;
    let visible = true;

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      setStatus('unsupported');
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.55;
    container.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-label', '炎と火の粉が揺れる焚き火の3Dアニメーション。ドラッグで角度を変えられます。');
    renderer.domElement.setAttribute('role', 'img');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(2.25, 1.7, 3.4);
    camera.lookAt(0, 0.45, 0);
    scene.add(new THREE.HemisphereLight(0xaebdd3, 0x291a12, 2.0));
    const fireLight = new THREE.PointLight(0xff7e35, 18, 7, 2);
    fireLight.position.set(0, 0.85, 0);
    scene.add(fireLight);
    const moonLight = new THREE.DirectionalLight(0xa2b6d2, 1.1);
    moonLight.position.set(-3, 5, 4);
    scene.add(moonLight);
    const ground = new THREE.Mesh(new THREE.CircleGeometry(2.5, 48), new THREE.MeshStandardMaterial({ color: 0x26241f, roughness: 1 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.025;
    scene.add(ground);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.45, 0);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.minDistance = 2.5;
    controls.maxDistance = 6.5;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.update();

    const clock = new THREE.Clock();
    const render = () => {
      frameId = requestAnimationFrame(render);
      const delta = Math.min(clock.getDelta(), 0.05);
      if (visible) {
        if (runtime.current?.playing) mixer?.update(delta);
        controls.update();
        fireLight.intensity = 17 + (runtime.current?.playing ? 2 * Math.sin(performance.now() * 0.003) : 0);
        renderer.render(scene, camera);
      }
    };
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.01 });
    intersectionObserver.observe(container);
    runtime.current = { playing };
    new GLTFLoader().load(model, (gltf) => {
      if (disposed) return;
      gltfScene = gltf.scene;
      scene.add(gltfScene);
      if (gltf.animations.length) {
        mixer = new THREE.AnimationMixer(gltfScene);
        for (const clip of gltf.animations) mixer.clipAction(clip).play();
      }
      setStatus('ready');
      resize();
    }, undefined, () => { if (!disposed) setStatus('error'); });
    resize();
    render();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      controls.dispose();
      if (gltfScene) {
        gltfScene.traverse((object) => {
          if (object.isMesh) {
            object.geometry.dispose();
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => material.dispose());
          }
        });
      }
      ground.geometry.dispose();
      ground.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      runtime.current = null;
    };
  }, [model]);

  useEffect(() => { if (runtime.current) runtime.current.playing = playing; }, [playing]);

  return <div className="stage-shell">
    <div ref={host} className="fire-stage" />
    {status === 'loading' && <div className="stage-message" role="status">焚き火を準備しています…</div>}
    {status === 'unsupported' && <div className="stage-message" role="status">この環境では3D表示を利用できません。下の写真をお楽しみください。</div>}
    {status === 'error' && <div className="stage-message" role="alert">3Dモデルを読み込めませんでした。ページを再読み込みしてみてください。</div>}
    {(status === 'unsupported' || status === 'error') && <img className="stage-fallback" src={`${import.meta.env.BASE_URL}previews/hearth-fire.png`} alt="焚き火の静止画" />}
  </div>;
}
