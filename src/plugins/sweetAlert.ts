import sweetAlert from 'sweetalert2';

const swal = sweetAlert;

/**
 * @plugin Toast do Sweet Alert com configurações base
 */
const Toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1750, // quase 2s, 1.75s
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener('mouseenter', swal.stopTimer);
    toast.addEventListener('mouseleave', swal.resumeTimer);
  },
});

export default swal;
export { Toast };
