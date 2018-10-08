<template lang="pug">
  div.menuCanvas
    canvas#menu_canvas
</template>

<script>
  export default {
    name: "CanvasMenu",
    mounted() {
      var camera, scene, renderer
      var geometry, material, mesh, light, light1

      init()
      animate()

      function init() {
        //RENDERER
        renderer = new THREE.WebGLRenderer({canvas: document.getElementById('menu_canvas'), antialias: true});
        renderer.setClearColor(0x282828);

        //CAMERA
        camera = new THREE.PerspectiveCamera(10, 1, 0.1, 3000);

        //SCENE
        scene = new THREE.Scene();

        //LIGHTS
        light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);

        light1 = new THREE.PointLight(0xffffff, 0.5);
        scene.add(light1);

        //OBJECT
        var radius = 85;
        var geometry1 = new THREE.IcosahedronBufferGeometry( radius, 1 );

        geometry = new THREE.CubeGeometry(100, 100, 100);

        material = new THREE.MeshLambertMaterial({color: 0x429db3});
        mesh = new THREE.Mesh(geometry1, material);
        mesh.position.set(0, 0, -1000);

        scene.add(mesh);
      }

      function animate() {
        requestAnimationFrame(animate)

        mesh.rotation.x += 0.02
        mesh.rotation.y += 0.02

        renderer.render(scene, camera)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menuCanvas {
    padding: 10px;

    #menu_canvas {
      width: 100px;
      height: 100px;
      position: fixed;
    }
  }
</style>
