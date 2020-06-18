module.exports = {
  apps: [{
    name: "api-server",
    script: "./api.js",
    interpreter: "/usr/bin/babel-node",
    exec_mode: "fork"
    watch: false
  }]
}
