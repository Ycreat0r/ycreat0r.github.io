/* =====================================================
   PORTFOLIO DATABASE
   Добавляй новые работы только сюда
===================================================== */

const works = [

    {
        id: 1,
        title: "Репортаж Lazertag",
        type: "video",
        category: "commercial",
        year: "2025",
        thumbnail: "assets/images/lazertag.jpg",          // превью (можно то же видео или картинку)
        video: "assets/videos/Репортаж_Lazertag_1.mp4",   // ← точное имя файла
        description: "Репортажная съёмка мероприятия Lazertag.",
        tags: ["Репортаж", "Event", "4K"]
    },

    {
        id: 2,
        title: "Форум МАИФ Пулково",
        type: "video",
        category: "commercial",
        year: "2025",
        thumbnail: "assets/images/maif.jpg",
        video: "assets/videos/Форум МАИФ Пулково-2_1.mp4",  // ← точное имя файла
        description: "Съёмка форума МАИФ в Пулково.",
        tags: ["Event", "Corporate", "Video"]
    },

    {
        id: 3,
        title: "Posvyat",
        type: "video",
        category: "personal",
        year: "2025",
        thumbnail: "assets/images/hero.jpg",
        video: "assets/videos/hero.mp4",
        description: "Кинематографичный ролик.",
        tags: ["Cinema", "Creative"]
    }

];