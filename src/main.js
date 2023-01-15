addEventListener("DOMContentLoaded", () => {
  const $canvas = document.getElementById("canvas");
  const context = $canvas.getContext("webgl2");

  const vertexShader = context.createShader(WebGL2RenderingContext.VERTEX_SHADER);
  const vertexShaderSource = `#version 300 es
    precision highp float;

    in vec2 positionAttribute;

    void main() {
      gl_Position = vec4(positionAttribute, 0.0, 1.0);
    }
  `;
  context.shaderSource(vertexShader, vertexShaderSource);
  context.compileShader(vertexShader);

  const fragmentShader = context.createShader(WebGL2RenderingContext.FRAGMENT_SHADER);
  const fragmentShaderSource = `#version 300 es
    precision mediump float;

    out vec4 FragColor;

    void main() {
      FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `;
  context.shaderSource(fragmentShader, fragmentShaderSource);
  context.compileShader(fragmentShader);

  const program = context.createProgram();
  context.attachShader(program, vertexShader);
  context.attachShader(program, fragmentShader);
  context.linkProgram(program);
  context.useProgram(program);

  const vertices = [
    -0.5, -0.5,
    0.5, -0.5,
    0.0, 0.5,
  ];
  const vertexSize = 2;

  const buffer = context.createBuffer();
  context.bindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, buffer);
  context.bufferData(
    WebGL2RenderingContext.ARRAY_BUFFER,
    new Float32Array(vertices),
    WebGL2RenderingContext.STATIC_DRAW
  );

  const positionAttribute = context.getAttribLocation(program, "positionAttribute");
  context.enableVertexAttribArray(positionAttribute);
  context.vertexAttribPointer(
    positionAttribute,
    vertexSize,
    WebGL2RenderingContext.FLOAT,
    false,
    0,
    0
  );

  context.drawArrays(
    WebGL2RenderingContext.TRIANGLES,
    0,
    vertices.length / vertexSize
  );
});
