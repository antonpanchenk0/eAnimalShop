const notify = {
    notifyElem: document.querySelector('.popup'),
    toast: document.querySelector('.popup .toast'),
    notifyBody: document.querySelector('.popup .toast .toast-body .body-title'),
};

const notifyService = {
    render: (data)=>{
        console.log(notify)
        notify.notifyBody.innerHTML = data;
        notify.notifyElem.classList.remove('d-none');
        $(notify.toast).toast('show'); //bootstrap4 toast show method
    },
    close: ()=>{
        notify.notifyElem.classList.add('d-none');
        notify.notifyBody.innerHTML = '';
    }

}

Object.freeze(notifyService);
$(notify.toast).on('hidden.bs.toast', notifyService.close);//bootstrap4 toast close event

export default notifyService;
