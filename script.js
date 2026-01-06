document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.alquran.cloud/v1/meta')
        .then(response => response.json())
        .then(data => {
            const surahs = data.data.surahs.references; // قائمة السور
            const surahList = document.getElementById('surahList');
            surahs.forEach(surah => {
                const card = document.createElement('div');
                card.className = 'col-md-4';
                card.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">سورة ${surah.name} (${surah.englishName})</h5>
                            <p>عدد الآيات: ${surah.numberOfAyahs}</p>
                            <a href="surahs/${surah.englishName.toLowerCase()}.html" class="btn btn-primary">اذهب إلى السورة</a>
                        </div>
                    </div>
                `;
                surahList.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching surahs:', error));

    // بحث بسيط
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const filter = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.col-md-4');
        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            card.style.display = title.includes(filter) ? 'block' : 'none';
        });
    });
});