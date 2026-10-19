/* TAESUNG AR — proprietary school graphic supplied by user; prototype scripts MIT-style example.
   This module depends on A-Frame/THREE loaded before the page scene. */
(() => {
  'use strict';
  if (!window.AFRAME || !window.THREE) {
    document.addEventListener('DOMContentLoaded', () => {
      const state = document.getElementById('state');
      if (state) state.textContent = 'AR 라이브러리를 불러오지 못했습니다. 인터넷 연결을 확인하세요.';
    });
    return;
  }
  const THREE = window.THREE;
  AFRAME.registerComponent('logo-geometry', {
    init() {
      this.logoGroup = new THREE.Group();
      this.el.object3D.add(this.logoGroup);
      fetch('./assets/logo-geometry.json')
        .then(res => { if(!res.ok) throw new Error(`3D asset fetch ${res.status}`); return res.json(); })
        .then(data => {
          const W = 1.55;
          const H = W*data.h/data.w;
          const mats = {
            black:[new THREE.MeshStandardMaterial({color:0x15191f,metalness:0.34,roughness:0.32}),new THREE.MeshStandardMaterial({color:0x47566c,metalness:0.47,roughness:0.29})],
            blue:[new THREE.MeshStandardMaterial({color:0x1166b3,metalness:0.3,roughness:0.31,emissive:0x052b50,emissiveIntensity:0.30}),new THREE.MeshStandardMaterial({color:0x3eabff,metalness:0.43,roughness:0.27})]
          };
          const pathFrom = (points, ctor) => {
            let coords = points.map(p => new THREE.Vector2((p[0]/data.w-.5)*W,(.5-p[1]/data.h)*H));
            // Winding direction: outer CW, holes CCW for Three ExtrudeGeometry
            const cwDesired = ctor === 'outer';
            if (THREE.ShapeUtils.isClockWise(coords) !== cwDesired) coords.reverse();
            const path = ctor === 'outer' ? new THREE.Shape() : new THREE.Path();
            coords.forEach((p,i) => i === 0 ? path.moveTo(p.x,p.y) : path.lineTo(p.x,p.y));
            path.closePath();
            return path;
          };
          data.shapes.forEach(part => {
            if(part.outline.length<3) return;
            const s = pathFrom(part.outline,'outer');
            for(const hp of part.holes) if(hp.length>2) s.holes.push(pathFrom(hp,'hole'));
            const geometry = new THREE.ExtrudeGeometry(s,{depth:0.095,bevelEnabled:true,bevelThickness:0.010,bevelSize:0.008,bevelSegments:2,steps:1,curveSegments:12});
            geometry.computeVertexNormals();
            const mesh = new THREE.Mesh(geometry,mats[part.color]);
            this.logoGroup.add(mesh);
          });
          // trim glow gives subtle augmented-reality appearance without changing the brand colors
          const ambient = new THREE.AmbientLight(0xffffff,2.0);
          const key = new THREE.DirectionalLight(0xffffff,2.1); key.position.set(-0.6,1.5,2.4);
          const fill = new THREE.DirectionalLight(0x65b8ff,1.15); fill.position.set(1.3,-.6,1.0);
          this.logoGroup.add(ambient,key,fill);
          this.el.emit('logo-ready');
        }).catch(err => {
          console.error('TAESUNG model',err);
          const state = document.querySelector('#state'); if(state)state.textContent='3D 모델 파일을 읽지 못했습니다.';
        });
    }
  });
  AFRAME.registerComponent('ar-billboard', {
    init(){this.worldCameraQ=new THREE.Quaternion();this.worldParentQ=new THREE.Quaternion();},
    tick(){
      const camera = this.el.sceneEl.camera;
      if(!camera || !this.el.object3D.parent) return;
      camera.getWorldQuaternion(this.worldCameraQ);
      this.el.object3D.parent.getWorldQuaternion(this.worldParentQ);
      this.el.object3D.quaternion.copy(this.worldParentQ.invert().multiply(this.worldCameraQ));
    }
  });
  AFRAME.registerComponent('ar-logo-animation', {
    init(){
      this.t=0; this.found=false; this.ready=false;
      this.el.addEventListener('logo-ready',()=>{this.ready=true;});
      this.marker=document.querySelector('#ringMarker');
      if(this.marker){
        this.marker.addEventListener('markerFound',()=>{this.found=true;this.t=0; document.body.classList.add('tracked'); const s=document.getElementById('state'); if(s)s.textContent='태성고 AR 인식 성공!';});
        this.marker.addEventListener('markerLost',()=>{this.found=false;document.body.classList.remove('tracked');const s=document.getElementById('state'); if(s)s.textContent='링 중앙의 태성 로고를 다시 비춰주세요';});
      }
      this.el.object3D.scale.setScalar(0.0001);
    },
    tick(_t,dt){
      if(!this.found||!this.ready) return;
      this.t=Math.min(this.t+(dt||16),60000);
      const p=Math.min(this.t/850,1); const overshoot=1+1.4*Math.pow(1-p,3)*Math.sin(p*Math.PI*2);
      const scale=Math.max(0.0001,(1-Math.pow(1-p,3))*overshoot);
      this.el.object3D.scale.setScalar(scale);
      this.el.object3D.position.y=0.82+0.06*Math.sin(this.t*0.0021);
    }
  });
  document.addEventListener('DOMContentLoaded',()=>{
    const scene=document.querySelector('a-scene');
    if(scene) scene.addEventListener('loaded',()=>{
      const s=document.getElementById('state');
      if(s)s.textContent='카메라를 허용하고 링의 정사각형 마커를 비춰주세요';
    });
    const btn=document.getElementById('infoBtn');
    if(btn)btn.addEventListener('click',()=>{document.getElementById('tips').classList.toggle('show');});
  });
})();

