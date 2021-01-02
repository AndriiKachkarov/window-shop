const forms = () => {
    const formList = document.querySelectorAll('form');
    const inputList = document.querySelectorAll('input');
    const phoneList = document.querySelectorAll('input[name="user_phone"]');

    const message = {
        loading: 'Loading...',
        success: 'Thanks! We will contact You soon',
        failure: 'Something went wrong...'
    };

    phoneList.forEach(phone => {
        phone.addEventListener('input', () => {
            phone.value = phone.value.replace(/\D/, '');
        });
    });

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
      inputList.forEach(input => {
          input.value = '';
      })
    };

    formList.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            form.appendChild(statusMessage);

            const formData = new FormData(form);

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(_ => {
                    statusMessage.textContent = message.failure;
                })
                .finally(_ => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 4000)
                })
        })
    })
};

export default forms;
