import checkNumInputs from "./checkNumInputs";

const forms = (modalState) => {
    const formList = document.querySelectorAll('form');
    const inputList = document.querySelectorAll('input');

    const message = {
        loading: 'Loading...',
        success: 'Thanks! We will contact You soon',
        failure: 'Something went wrong...'
    };

    checkNumInputs('input[name="user_phone"]');

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
            if (form.getAttribute('data-calc' ) === 'end') {
                for (let key in modalState) {
                    formData.append(key, modalState[key]);
                }
            }

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
