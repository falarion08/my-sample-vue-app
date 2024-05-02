<script setup lang="ts">
    import { ref, defineEmits, onMounted, reactive } from 'vue'
    import { type User } from "@/model/users";
    import * as userServices from '@/services/userServices';
    import { useToast } from 'vue-toastification';
    import { useRouter } from 'vue-router';
    import store from '@/viewModel/store';

    const router = useRouter();
    if(store.getters.getToken() === '')
      router.push('/login')

    
    onMounted(()=>{
      userServices.getAllUsers().then(response=>{
        if(response.message === 'success'){
          users.value = response.users;
        }
      })
    });
    const toast = useToast();
    const users = ref([] as User[]);
    
    const selectedUser = reactive({
      id :0,
      profile_pic:'',
      username:'',
      password:'',
      firstName:'',
      lastName: '',
      birthDate: '',
      gender: '',
      email: '',
      telephone: '',
      isAdmin: ''

    })
    const isModalOpen = ref(false);
    const API_URL = 'http://localhost:3000';
    const fullName = ref('');
    
    function removeUser(user: User){
        users.value = users.value.filter(u => u.id !== user.id);
    }

    function editUser(user: User){
      fullName.value = user.firstName + ' ' + user.lastName;
      selectedUser.id = user.id
      selectedUser.username= user.username
      selectedUser.password = user.password
      selectedUser.firstName=user.firstName
      selectedUser.lastName= user.lastName
      selectedUser.birthDate= user.birthDate
      selectedUser.gender= user.gender
      selectedUser.email= user.email
      selectedUser.telephone= user.telephone
      selectedUser.isAdmin= String(user.isAdmin)
      selectedUser.profile_pic = user.profile_pic;
      
      isModalOpen.value = true;

      }

    function closeModal(){
      selectedUser.id = 0
      selectedUser.username=''
      selectedUser.password= ''
      selectedUser.firstName=''
      selectedUser.lastName= ''
      selectedUser.birthDate= ''
      selectedUser.gender= ''
      selectedUser.email= ''
      selectedUser.telephone= ''
      selectedUser.username= ''
      selectedUser.isAdmin= ''
      selectedUser.profile_pic = ''

      isModalOpen.value = false
    }

    function submitUpdate(userID:number|undefined){
      if(selectedUser !== null && userID !== undefined)

        userServices.updateUserByID(userID, selectedUser).then(response=>{
          if(response.message === 'success'){
            userServices.getAllUsers().then(response=>{
              if(response.message === 'success'){
                users.value = response.users;
                toast.success('Successfully updated user ' + selectedUser.username);

              }
            })

          }
      }); 
      closeModal(); 
    }

    function deleteUser(userID:number){
        userServices.deleteUser(userID).then(response=>{
          if(response.message === 'success'){
            userServices.getAllUsers().then(response=>{
              if(response.message === 'success'){
                users.value = response.users;
                toast.info('Deleted user ' + selectedUser.username);

              }
            })

          }
        });
        closeModal(); 

    }
    
</script>

<template>   
  <div class="columns is-centered">
    <div class="column box has-shadow is-rounded" style="margin-top: 20px;">

      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Profile</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Emails</th>
            <th>Username</th>
            <th>Admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user,index) in users" :key="user.id">
            <td><img class="user-image-is-small" :src="`${API_URL}/${user.profile_pic}`" style="width: 50px; height: 50px;"></td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.isAdmin }}</td>
            <td>
              <button class="button" @click="editUser(user)">
                <i class="fas fa-edit"></i> 
              </button>
              <button class="button" @click="deleteUser(user.id)">
                <i class="fas fa-trash-alt"></i> 
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- BEGIN: Modal Card -->
  <div class="modal" v-if="isModalOpen && selectedUser">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit User</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <p>Selected User: {{ fullName }}</p>
        <div>

          <p><strong>Username:</strong></p>
          <input v-model="selectedUser.username" type="text" placeholder="Username">

          <p><strong>Is Admin:</strong></p>
          <select id ="gender" name="gender" v-model="selectedUser.isAdmin">
              <option value="true">True</option>
              <option value="false">False</option>
          </select>
          <p><strong>First Name:</strong></p>
          <input v-model="selectedUser.firstName" type="text" placeholder="First Name">

          <p><strong>Last Name:</strong></p>
          <input v-model="selectedUser.lastName" type="text" placeholder="Last Name">
          
          <p><strong>Email Address:</strong></p>
          <input v-model="selectedUser.email" type="email" placeholder="Email">

          <p><strong>Gender:</strong></p>
          <select id ="gender" name="gender" v-model="selectedUser.gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
          </select>
          <p><strong>Telephone:</strong></p>
          <input type="tel" id="telephone" v-model="selectedUser.telephone" name="telephone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
          <p><strong>Date of Birth:</strong></p>
          <input v-model="selectedUser.birthDate" type="date">


        </div>
      </section>

      <footer class="modal-card-foot">
        <button  class="button is-success" @click="submitUpdate(selectedUser!.id)">Save changes</button>
        <button class="button" @click="closeModal">Cancel</button>
      </footer>
    </div>
  </div>
  <!-- END: Modal Card -->

  
</template>

<style scoped>
  .table {
    margin-top: 20px;
  }

  button.is-primary.is-hovered, .button.is-primary:hover {
    background-color: rgb(200, 93, 150);
    border-color: transparent;
    color: #fff;
  }

  .button.is-primary {
    background-color: rgb(223, 145, 158);
    border-color: transparent;
    color: #fff;
  } 

  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-card {
    width: 400px;
  }
</style>
