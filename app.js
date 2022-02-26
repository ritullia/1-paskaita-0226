
//su fetch funkcija
const randomImageUrl = 'https://dog.ceo/api/breeds/image/random';
const rezultatas = document.querySelector('#rezultatas');

const getImage = (url, random = true) => {
    fetch(url)
        .then(response => response.json())
        .then(response => {
            if (response.status === "success")
                rezultatas.innerHTML = `<img src = "${response.message}" alt="">`;
            else
                rezultatas.textContent = random ? 'Nuotraukos užkrauti nepavyko' : 'Nepavyko rasti nuotraukos pagal tokią veislę'
        })
}

window.addEventListener('load', () => {
    getImage(randomImageUrl)
})

document.querySelector('.findBreed').addEventListener('click', () => {
    let breed = document.querySelector('input[name="dog-breed"]').value;
    if (breed === "") {
        rezultatas.textContent = 'Neįvesta jokia veislė'
        return false
    }
    let parsedBreed = breed.toLowerCase()
    let breedUrl = `https://dog.ceo/api/breed/${parsedBreed}/images/random`
    getImage(breedUrl, false)
})



