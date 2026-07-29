/* =====================================================
   PORTFOLIO DATABASE
   Добавляй новые работы только сюда
===================================================== */
const works = [
    {
        id: 1,
        title: "ГУАП Лазертаг",
        type: "video",
        category: "commercial",
        year: "2025",
        thumbnail: "assets/images/Lazertag.jpg",
        video: "assets/videos/Lazertag.mp4",
        description: "Репортажная съёмка мероприятия Lazertag.",
        tags: ["Репортаж", "Event", "4K"]
    },
    {
        id: 2,
        title: "Форум МАИФ Пулково",
        type: "video",
        category: "commercial",
        year: "2025",
        thumbnail: "assets/images/MAIF.jpg",
        video: "assets/videos/MAIF.mp4",
        description: "Съёмка форума МАИФ в Пулково.",
        tags: ["Event", "Corporate", "Video"]
    },
    {
        id: 3,
        title: "ГУАП Посвят",
        type: "video",
        hero: true,   // ← показывать в карусели
        category: "personal",
        year: "2025",
        thumbnail: "assets/images/hero.jpg",
        video: "assets/videos/hero.mp4",
        description: "Кинематографичный ролик.",
        tags: ["Cinema", "Creative"]
    },
   {
    id: 4,
    title: "Сломал гитару блин",
    type: "video",
    category: "commercial",
    year: "2025",
    thumbnail: "assets/images/01_bastard0.jpg",
    video: "assets/videos/01_bastard0.mp4",
    description: "Коммерческий видеопроект.",
    tags: ["Commercial", "Video"]
},
{
    id: 5,
    title: "РИЛС Логвинский",
    type: "video",
    category: "commercial",
    year: "2025",
    thumbnail: "assets/images/1R_Final.jpg",
    video: "assets/videos/1R_Final.mp4",
    description: "Коммерческий видеопроект.",
    tags: ["Commercial", "Creative"]
},
{
    id: 6,
    title: "Пойдем в даль со мной",
    type: "video",
    hero: true,   // ← показывать в карусели
    category: "commercial",
    year: "2025",
    thumbnail: "assets/images/02_Vasya.jpg",
    video: "assets/videos/02_Vasya.mp4",
    description: "Коммерческий видеопроект.",
    tags: ["Commercial", "Video"]
},
{
    id: 7,
    title: "РИЛС Логвинский",
    type: "video",
    category: "commercial",
    year: "2025",
    thumbnail: "assets/images/2R_Final.jpg",
    video: "assets/videos/2R_Final.mp4",
    description: "Коммерческий видеопроект.",
    tags: ["Commercial", "Event"]
},
{
    id: 8,
    title: "3D Space Harry Potter",
    type: "video",
    category: "personal",
    year: "2025",
    thumbnail: "assets/images/3D_Space_Harry_Potter.jpg",
    video: "assets/videos/3D_Space_Harry_Potter.mp4",
    description: "3D-анимационный проект.",
    tags: ["3D", "Animation", "Creative"]
},
{
    id: 9,
    title: "Открытие СВП",
    type: "video",
    category: "commercial",
    year: "2024",
    thumbnail: "assets/images/08.11.2024_all_svp.jpg",
    video: "assets/videos/08.11.2024_all_svp.mp4",
    description: "Репортажная съёмка открытия.",
    tags: ["Event", "Reportage"]
},
{
    id: 10,
    title: "Ярмарка Вокансий",
    type: "video",
    category: "commercial",
    year: "2024",
    thumbnail: "assets/images/12_03_2024_Yarmarka.jpg",
    video: "assets/videos/12_03_2024_Yarmarka.mp4",
    description: "Репортажная съёмка мероприятия.",
    tags: ["Event", "Corporate"]
},
{
    id: 11,
    title: "Dankov",
    type: "video",
    category: "commercial",
    year: "2025",
    thumbnail: "assets/images/Dankov_final.jpg",
    video: "assets/videos/Dankov_final.mp4",
    description: "Коммерческий видеопроект.",
    tags: ["Commercial"]
},
{
    id: 12,
    title: "ГУАП Творческий этап",
    type: "video",
    category: "personal",
    year: "2025",
    thumbnail: "assets/images/finalTvorch.jpg",
    video: "assets/videos/finalTvorch.mp4",
    description: "Авторский видеопроект.",
    tags: ["Creative", "Cinema"]
},
{
    id: 13,
    title: "Интервью Абилимпикс",
    type: "video",
    category: "commercial",
    year: "2025",
    thumbnail: "assets/images/Interv_Ambilimp.jpg",
    video: "assets/videos/Interv_Ambilimp.mp4",
    description: "Интервью.",
    tags: ["Interview"]
},
{
    id: 14,
    title: "Интервью травление плат",
    type: "video",
    category: "commercial",
    year: "2025",
    thumbnail: "assets/images/Interv_BRolls_Travlenie.jpg",
    video: "assets/videos/Interv_BRolls_Travlenie.mp4",
    description: "B-roll видеоматериал.",
    tags: ["B-roll"]
},
{
    id: 15,
    title: "Итоги года Кафедра",
    type: "video",
    category: "commercial",
    year: "2025",
    thumbnail: "assets/images/Itogi_goda.jpg",
    video: "assets/videos/Itogi_goda.mp4",
    description: "Итоговый корпоративный ролик.",
    tags: ["Corporate"]
},
{
    id: 16,
    title: "Кафедра 22",
    type: "video",
    category: "commercial",
    year: "2025",
    thumbnail: "assets/images/Kafedra22_Timur.jpg",
    video: "assets/videos/Kafedra22_Timur.mp4",
    description: "Образовательный проект.",
    tags: ["Education"]
},
{
    id: 17,
    title: "Кобзарь",
    type: "video",
    category: "commercial",
    year: "2025",
    thumbnail: "assets/images/Kobzar_final.jpg",
    video: "assets/videos/Kobzar_final.mp4",
    description: "Коммерческий ролик.",
    tags: ["Commercial"]
},
{
    id: 18,
    title: "Кондратюк",
    type: "video",
    category: "commercial",
    year: "2025",
    thumbnail: "assets/images/Kondratuk_final.jpg",
    video: "assets/videos/Kondratuk_final.mp4",
    description: "Коммерческий проект.",
    tags: ["Commercial"]
},
{
    id: 19,
    title: "Курс Нейросетей",
    type: "video",
    category: "commercial",
    year: "2025",
    thumbnail: "assets/images/Kurs_Module_1_1.jpg",
    video: "assets/videos/Kurs_Module_1_1.mp4",
    description: "Обучающий видеокурс.",
    tags: ["Course", "Education"]
},
{
    id: 20,
    title: "Творческая визитка",
    type: "video",
    category: "personal",
    year: "2025",
    thumbnail: "assets/images/Tvorch_viz.jpg",
    video: "assets/videos/Tvorch_viz.mp4",
    description: "Авторский проект.",
    tags: ["Creative"]
},
{
    id: 21,
    title: "Творческая визитка",
    type: "video",
    category: "personal",
    year: "2025",
    thumbnail: "assets/images/Tvorch_viz2.jpg",
    video: "assets/videos/Tvorch_viz2.mp4",
    description: "Авторский проект.",
    tags: ["Creative"]
},
{
    id: 22,
    title: "Юбилей института",
    type: "video",
    category: "commercial",
    year: "2025",
    thumbnail: "assets/images/Ubiley8.jpg",
    video: "assets/videos/Ubiley8.mp4",
    description: "Видеоролик с мероприятия.",
    tags: ["Event"]
},
{
    id: 23,
    title: "Волкова",
    type: "video",
    category: "commercial",
    year: "2025",
    thumbnail: "assets/images/Volkova_FINAL.jpg",
    video: "assets/videos/Volkova_FINAL.mp4",
    description: "Коммерческий видеопроект.",
    tags: ["Commercial"]
},

];