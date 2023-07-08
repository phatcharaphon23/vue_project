import Vue from "vue";
import Swal from "sweetalert2";

export function notification(icon, title, timer) {
  Vue.swal({
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: timer,
  });
}

export function notificationConfirm(icon, title, timer, buttonText =  'OK') {
  Vue.swal({
    icon: icon,
    title: title,
    showCloseButton: true,
    focusConfirm: false,
    confirmButtonText: buttonText,
    timer: timer,
  });
}

export async function confirmAlertDisplay(title, text) {
  let response = false;
  await Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#34c38f",
    cancelButtonColor: "#f46a6a",
    confirmButtonText: "ใช่",
    cancelButtonText: "ไม่ใช่",
  }).then((result) => {
    if (result.isConfirmed) {
      response = true;
    } else {
      response = false;
    }
  });
  return response;
}

export function isValid(value) {
  return value !== undefined && value !== null && value !== '' ? true : false
}

export function isObjectValid(data) {

  if (data !== undefined && data !== null) return true

  else return false

}

export function containsKey(obj, key) {

  return Object.keys(obj).includes(key)

}

export function anyArrayObjectValid(data) {

  if (data !== undefined && data !== null && data.length > 0) return true

  else return false

}