import projectInfo from '@/data/projectInfo'
import users from '@/data/users'
import icons from '@/data/socialIcons'

export default {
    data() {
        return {
            projectInfo,
            icons,
            users,
            posts: [],
            postsDetails: [],
            project: {},
            members: [],
            lastYear: '',
            lastMonth: ''
        }
    },
/* eslint-disable */
    methods: {
        async toggleProjectToSideBar(toggle, title, postid, isView){
            if(!postid) postid = ''
            if(!isView) isView = ''
            if(toggle == 'add'){
                this.$store.state.menu.map(e => {
                    if(e.title == title){
                        e.child.push({
                            href: '/project/' + this.project.project_id,
                            title: this.project.name,
                            icon: 'far fa-folder-open',
                            child: [
                                {
                                    href: '/project/' + this.project.project_id + '/posts/' + postid + isView,
                                    title: 'Posts',
                                    icon: 'fab fa-instagram',
                                },
                                {
                                    href: '/project/' + this.project.project_id + '/settings',
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
            /* eslint-disable */

        },

        async getProjectData(id) {
            try {
                this.project = (await this.$http.get(`/projects/${id}`)).data
            } catch(e) {
                console.error(e)
            }
            // this.getUsers(this.project.members)
        },

        stringToArray() {
            if(!this.project.tags) return
            this.project.tags = this.project.tags.split(",")
        },

        getUsers(members) {
            this.members = this.users.filter(e => {
                for(let i in members){
                    if(e.user_id == members[i]) return e
                }
            })
        },

        async getPostsLists(id) {
            try {
                this.posts = (await this.$http.get(`/posts/${id}`)).data
            } catch(e) {
                console.error(e)
            }
            return this.posts
        },

        async getPostsDetails(month, year, projectid) {
            if(!month || !year || !projectid) return
            try {
                this.postsDetails = await this.$http.get(`/posts/${projectid}/${month}/${year}`)
                this.$set(this.postsDetails, 'project_id', projectid)
                this.$set(this.postsDetails, 'month', month)
                this.$set(this.postsDetails, 'year', year)
            } catch(e) {
                console.error(e)
            }
        },

        getLastMonth() {
            if(this.posts.length) {
                this.lastMonth = this.posts[0].month
                this.lastYear = this.posts[0].year
            }
        }

    }
}