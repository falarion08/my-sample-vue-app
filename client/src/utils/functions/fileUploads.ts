import { type Ref } from "vue";
export function handleImageUpload(picture_storage:Ref<File | null>,event:any){
    picture_storage.value = event.target.files[0];
}
