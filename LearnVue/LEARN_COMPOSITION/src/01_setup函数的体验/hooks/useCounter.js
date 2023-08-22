import {ref} from 'vue'
export default function useCounter(){
    let counter =ref(100)
  const increment = () =>{
    counter.value++
  }
  const decrement = () =>{
    counter.value--
  }
  return {
    counter,
    increment,
    decrement
  }
}