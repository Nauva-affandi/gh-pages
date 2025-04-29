import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

const loginUiStore = defineStore('form login', () => {
  const user = reactive({
    email: '',
    pw: '',
    pw_confirm: ''
  })
  
  const err = reactive({
    login: {
      email: {
        show: false,
        status: 2,
        // 0 : invalid
        // 1 : valid
        // 2 : typing / hide
        msg: '',
      },
      pw: {
        show: false,
        status: 2,
        msg: '',
      },
      valid: true,
      msg: '',
    },
    signin: {
      email: {
        show: false, 
        status: 2,
        msg: '',
      },
      pw: {
        show: false,
        status: 2,
        msg: '',
      },
      pw_confirm: {
        show: false,
        status: 2,
        msg: '',
      },
      valid: true,
      msg: ''
    }
  })
  
  // show auth ui
  const show = ref(false) // false
  const use = (i:string = 'toggle') => {
    try {
      const timer = 170
      status.value = true
      if(i == 'show') {
        setTimeout(() => show.value = true, timer) 
      } else if(i == 'hide') {
        setTimeout(() => show.value = false, timer) 
      } else if(i == 'toggle') {
        setTimeout(() => show.value = !show.value, timer) 
      }
    } catch(err) {
      console.log(err)
    }
  }

  // switch ui login/signin
  const status = ref(true) // true
  const toggle_status = () => {
    try {
      status.value = !status.value
    } catch(err) {
      console.log(err)
    }
  }
  
  // switch hide & show eye login pw
  const pw_login_eye = ref(false) // false
  const toggle_pw_login = () => {
    try {
      pw_login_eye.value = !pw_login_eye.value
    } catch(err) {
      console.log(err)
    }
  }
  
  // switch hide & show eye signin pw
  const pw_signin_eye = ref(false) // false
  const toggle_pw_signin = () => {
    try {
      pw_signin_eye.value = !pw_signin_eye.value
    } catch(err) {
      console.log(err)
    }
  }
  
  // switch hide & show eye signin pw confirm
  const pw_confirm_signin_eye = ref(false) // flase
  const toggle_pw_confirm_signin = () => {
    try {
      pw_confirm_signin_eye.value = !pw_confirm_signin_eye.value
    } catch(err) {
      console.log(err)
    }
  }
  

  return {
    user,
    err,
    show,
    use,
    status,
    toggle_status,
    pw_login_eye,
    toggle_pw_login,
    pw_signin_eye,
    toggle_pw_signin,
    pw_confirm_signin_eye,
    toggle_pw_confirm_signin,
  }
})

export default loginUiStore