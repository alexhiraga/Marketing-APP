<template>
    <div class="GeneralSettings row">
        <div class="col-lg-4 col-sm-12 mt-3">
            <ProfileUser :user_info="user"/>
        </div>

        <div class="col-lg-5 col-sm-12 mt-3">

            <b-tabs content-class="mt-3">
                <b-tab title="Your account">
                    <UserSettings :user_info="user"/>
                </b-tab>
                
                <!-- <b-tab title="Users list" lazy v-if="user.permission < 4"> -->
                <b-tab title="Users list" lazy>
                    <ItemsList 
                        type="users"
                        :user_info="user"
                    />
                </b-tab>

                <!-- <b-tab title="Project list" lazy v-if="user.permission < 4"> -->
                <b-tab title="Project list" lazy>
                    <ItemsList 
                        type="projects"
                    />
                </b-tab>
            </b-tabs>
            
        </div>

        <div class="col-lg-3"></div>
    </div>
</template>

<script>
import ProfileUser from '@/components/settings/ProfileUser.vue'
import UserSettings from '@/components/settings/UserSettings.vue'
import ItemsList from '@/components/settings/ItemsList.vue'
import { mapState } from 'vuex'

export default {
    name: 'GeneralSettings',
    components: { ProfileUser, UserSettings, ItemsList },
    computed: mapState(['user']),

    data() {
        return {
            // user: {
            //     name: 'Alex Hiraga',
            //     user_id: 1,
            //     image: "https://scontent.fmgf7-1.fna.fbcdn.net/v/t31.18172-8/18953546_1057645851003182_5328420222623091627_o.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=3CZaVTvhrfAAX9J5E1H&_nc_ht=scontent.fmgf7-1.fna&oh=00_AfCfrkHv2Tq1YvXJFfcIvPIvol4qsaYaEYNVU4PfASBk7g&oe=640889B1",
            //     permission: 1
            // }
        }
    }
}
</script>

<style>

</style>