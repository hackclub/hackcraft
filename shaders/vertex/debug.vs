#version 300 es

in vec4 a_position;
in vec3 a_color;

uniform mat4 u_worldViewProjection;

out vec3 v_color;

void main() {
  gl_Position = u_worldViewProjection * a_position;
  v_color = a_color;
}
