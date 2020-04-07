  
def label = "worker-${UUID.randomUUID().toString()}"

podTemplate(label: label, cloud: 'kubernetes',
    containers: [
        containerTemplate(name: 'wtctl', image: 'registry.cn-beijing.aliyuncs.com/worktile/wtctl:latest', alwaysPullImage: true, ttyEnabled: true, command: 'cat')
    ],
    volumes: [
        hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
        hostPathVolume(mountPath: '/mongod', hostPath: '/data/cache/mongod'),
        hostPathVolume(mountPath: '/root/.npm', hostPath: '/data/cache/.npm'),
        hostPathVolume(mountPath: '/tmp/cache', hostPath: '/tmp/cache/wt-eros')
    ]
) {
    node(label) {

        def scmVars = checkout scm
        def commit = scmVars.GIT_COMMIT
        def branch = scmVars.GIT_BRANCH

        stage('Using Worktile Pipeline') {
            container('wtctl') {
              sh "wtctl"
            }
        }
    }
}
