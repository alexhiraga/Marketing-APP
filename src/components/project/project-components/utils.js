import projectInfo from '@/data/projectInfo'
import users from '@/data/users'
import icons from '@/data/socialIcons'

import posts from '@/data/postsList'

export default {
    data() {
        return {
            projectInfo,
            icons,
            users,
            posts,
            project: {},
            members: [],
        }
    },

    methods: {
        toggleProjectToSideBar(toggle, title, postid, isView){
            if(!postid) postid = ''
            if(!isView) isView = ''
            if(toggle == 'add'){
                this.$store.state.menu.map(e => {
                    if(e.title == title){
                        e.child.push({
                            href: '/project/' + this.id,
                            title: this.project.name,
                            icon: 'far fa-folder-open',
                            child: [
                                {
                                    href: '/project/' + this.id + '/posts/' + postid + isView,
                                    title: 'Posts',
                                    icon: 'fab fa-instagram',
                                },
                                {
                                    href: '/project/' + this.id + '/settings',
                                    title: 'Settings',
                                    icon: 'fas fa-cog'
                                }
                            ]
                        })
                    }
                })
            } else {
                this.$store.state.menu.map(e => {
                    if(e.title == title){
                        e.child.pop()
                    }
                })
            }

        },

        getProjectData(id) {
            //req to back-end 
            let projectInfo
            try {
                projectInfo = this.projectInfo

            } catch(e) {
                console.error(e)
            }
            this.project = projectInfo.find(e => e.id == id)

            this.getUsers(this.project.members)
        },

        getUsers(members) {
            this.members = this.users.filter(e => {
                for(let i in members){
                    if(e.user_id == members[i]) return e
                }
            })
        },

        getPostsLists() {
            //req to back-end
            //this.posts = await axios.get(...)
            return this.posts
        },

    }
}