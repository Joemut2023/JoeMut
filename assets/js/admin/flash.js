(()=>{
    const btns_flash = document.querySelectorAll('.btn-close-flash');
        if (btns_flash.length > 0) {
            btns_flash.forEach(btn=>{
                btn.addEventListener('click',async (e)=>{
                    await axios.post(`${SITE_URL}/admin/delete-flash`)
                })
            })
        }
})();