import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function PromoStage({ model, preview }) {
  const host = useRef(null);
  const runtime = useRef(null);
  const [status, setStatus] = useState('loading');
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(20);
  useEffect(() => {
    let disposed = false;
    let renderer;
    let observer;
    let animation;
    let camera;
    let mixer;
    let clipDuration = 20;
    let visible = true;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#edf3fa');
    const clock = new THREE.Clock();
    const state = { playing: false, time: 0 };
    const disposeScene = (root) => root.traverse((object) => {
      object.geometry?.dispose();
      for (const material of Array.isArray(object.material) ? object.material : object.material ? [object.material] : []) {
        for (const value of Object.values(material)) if (value?.isTexture) value.dispose();
        material.dispose();
      }
    });
    function draw() { if (camera && renderer) renderer.render(scene, camera); }
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
      renderer.domElement.setAttribute('aria-label', '商略AIの3Dアニメーション');
      renderer.domElement.setAttribute('role', 'img');
      host.current.appendChild(renderer.domElement);
      function resize() {
        const width = host.current?.clientWidth || 960;
        renderer.setSize(width, width * 9 / 16);
        draw();
      }
      observer = new ResizeObserver(resize);
      observer.observe(host.current);
      resize();
      scene.add(new THREE.HemisphereLight(0xe7efff, 0xc1bdaf, 1.3));
      const key = new THREE.DirectionalLight(0xffffff, 2.1);
      key.position.set(-3, 7, 4);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xffffff, 1.3);
      fill.position.set(4, 5, 2);
      scene.add(fill);
      new GLTFLoader().load(model, (gltf) => {
        if (disposed) { disposeScene(gltf.scene); return; }
        scene.add(gltf.scene);
        camera = gltf.cameras[0];
        if (!camera || !gltf.animations.length) { setStatus('error'); return; }
        clipDuration = gltf.animations[0].duration;
        setDuration(clipDuration);
        mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[0]);
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.play();
        // 自動再生しない。文字が揃った冒頭の見本から、ユーザー操作で上映する。
        state.time = 1.5;
        mixer.setTime(state.time);
        setPosition(state.time);
        scene.updateMatrixWorld(true);
        setStatus('ready');
        draw();
        runtime.current = {
          play(value) {
            if (state.time >= clipDuration - .01) { action.reset().play(); state.time = 0; mixer.setTime(0); setPosition(0); }
            state.playing = value;
            clock.getDelta();
            setPlaying(value);
          },
          seek(value) {
            state.time = value;
            action.reset().play();
            mixer.setTime(value);
            setPosition(value);
            draw();
          },
        };
        let lastUpdate = 0;
        function tick() {
          if (disposed) return;
          animation = requestAnimationFrame(tick);
          const delta = Math.min(clock.getDelta(), .1);
          if (!state.playing || document.hidden || !visible) return;
          state.time = Math.min(clipDuration, state.time + delta);
          mixer.setTime(state.time);
          draw();
          const now = performance.now();
          if (now - lastUpdate > 100 || state.time === clipDuration) { setPosition(state.time); lastUpdate = now; }
          if (state.time === clipDuration) { state.playing = false; setPlaying(false); }
        }
        tick();
      }, undefined, () => { if (!disposed) setStatus('error'); });
    } catch { setStatus('unsupported'); }
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    if (host.current) intersection.observe(host.current);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduce = (event) => { if (event.matches) runtime.current?.play(false); };
    preference.addEventListener('change', reduce);
    return () => {
      disposed = true;
      cancelAnimationFrame(animation);
      observer?.disconnect();
      intersection.disconnect();
      preference.removeEventListener('change', reduce);
      runtime.current = null;
      mixer?.stopAllAction();
      disposeScene(scene);
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, [model]);
  const ready = status === 'ready';
  return <div>
    <div className="promo-scene"><div ref={host} className="promo-canvas" />{!ready && <img src={preview} alt="青いワンピースの女の子と商略AIの紹介" />}{!ready && <p className="promo-scene-status" role="status">{status === 'loading' ? '3Dアニメーションを読み込み中…' : 'この環境では3D表示を利用できません。ムービーをご覧ください。'}</p>}</div>
    <div className="promo-scene-controls"><button type="button" disabled={!ready} onClick={() => runtime.current?.play(!playing)} aria-pressed={playing}>{playing ? '一時停止' : '再生'}</button><button type="button" disabled={!ready} onClick={() => { runtime.current?.seek(0); runtime.current?.play(false); }}>最初に戻す</button><label>再生位置<input type="range" min="0" max={duration} step="any" value={position} disabled={!ready} onChange={(event) => runtime.current?.seek(Number(event.target.value))} aria-valuetext={`${position.toFixed(1)}秒`} /></label><output aria-live="off">{position.toFixed(1)} / {duration.toFixed(1)}秒</output></div>
  </div>;
}
