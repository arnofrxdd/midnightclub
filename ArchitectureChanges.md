. GPU Instancing (THREE.InstancedMesh)
Currently, if we spawn 300 streetlights, 100 trees, and 50 trash cans, the CPU has to send 450 separate "Draw Calls" to the GPU every single frame. Browsers hate high draw calls.

The Fix: We can use GPU Instancing. This allows us to send the 3D model of a streetlight to the GPU exactly once, and then just send an array of 300 coordinates. The GPU draws all 300 streetlights in a single draw call, massively reducing CPU overhead.