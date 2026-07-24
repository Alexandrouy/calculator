// ============================================================
// ДАННЫЕ ДЛЯ КАЛЬКУЛЯТОРА (цены, коэффициенты, материалы)
// ============================================================

// ---------- БЛОК ЦЕН (меняйте здесь цены) ----------
const PRICES = {
    // === ФУНДАМЕНТ ===
    foundation: {
        slab_350:   43621,
        tape_1800:  35861.41,
        pile_150:   9484.18,
        pile_200:   7345.94,
        none:       0
    },
    // === СТЕНОВЫЕ КОНСТРУКЦИИ (ГРУППА) ===
    // Цена за м² площади застройки (S = L * W)
    wall_group: {
        option1: 20721.80,   // Керамзитоблок + перегородки из керамзитоблока + облицовочный кирпич
        option2: 23369.00,   // Газобетон + перегородки из газобетона + облицовочный кирпич (условно)
        option3: 22419.00,   // Кирпич 2,1 НФ + перегородки кирпичные + облицовка (условно)
        option4: 18000.00,   // Каркас 200 + каркас 150 + сайдинг (условно)
        // и так далее – вы добавите свои варианты
    },
    // === АРМОПОЯС ===
    armopoyas: {
        present: 4053.64,
        none:    0
    },
    // === ПЕРЕКРЫТИЯ ===
    floors: {
        wooden:     4527,
        precast:    6700,
        monolithic: 0
    },
    // === КРОВЛЯ ===
    roof: {
        metal:      9428,
        clickfaltz: 8760.03,
        none:       0
    },
    // === ВОДОСТОЧНАЯ СИСТЕМА ===
    gutter: {
        present:    1200,
        none:       0
    },
    // === ОКНА ===
    windows: {
        economy:    18300,
        standard:   20295,
        none:       0
    },
    // === ВХОДНАЯ ДВЕРЬ ===
    door_main: {
        present:    20000,
        none:       0
    }
};

// ---------- КОНСТАНТЫ ----------
const CONSTS = {
    tape_width: 0.5,
    door_width: 1.0,
    door_height: 2.1,
    delivery_percent: 0.045,
    limit_percent: 0.053,
    design_arkr: 950,
    design_eng: 950
};

// ---------- КОЭФФИЦИЕНТЫ ----------
const COEFFICIENTS = {
    floor_ground_factor: 1.0,
    floor_intermediate_factor: 1.0,
    floor_attic_factor: 1.0,
    armopoyas_factor: 1.0,
    roof_factor: 1.5,
    // коэффициенты для стен больше не нужны
};

// ---------- КАТЕГОРИИ ДЛЯ ВЫПАДАЮЩИХ СПИСКОВ ----------
const CATEGORIES = {
    foundation: {
        label: 'Тип фундамента',
        options: {
            slab_350:   { name: 'Плита 350 мм', price_key: 'slab_350', unit: 'm3' },
            tape_1800:  { name: 'Лента 1800х500', price_key: 'tape_1800', unit: 'm3' },
            pile_150:   { name: 'Сваи 150х150', price_key: 'pile_150', unit: 'm2' },
            pile_200:   { name: 'Сваи 200х200', price_key: 'pile_200', unit: 'm2' },
            none:       { name: 'ОТСУТСТВУЕТ', price_key: 'none', unit: 'm3' }
        },
        default: 'slab_350'
    },
    wall_group: {
        label: 'Стеновые конструкции (стены + перегородки + облицовка)',
        options: {
            option1: { name: 'Керамзитоблок + перегородки из керамзитоблока + облицовочный кирпич', price_key: 'option1', unit: 'm2' },
            option2: { name: 'Газобетон + перегородки из газобетона + облицовочный кирпич', price_key: 'option2', unit: 'm2' },
            option3: { name: 'Кирпич 2,1 НФ + перегородки кирпичные + облицовка', price_key: 'option3', unit: 'm2' },
            option4: { name: 'Каркас 200 + Каркас 150 + сайдинг', price_key: 'option4', unit: 'm2' }
        },
        default: 'option1'
    },
    floor_ground: {
        label: 'Цокольное перекрытие',
        options: {
            wooden:     { name: 'Деревянное (по балкам)', price_key: 'wooden', unit: 'm2' },
            precast:    { name: 'Сборное (пустотные плиты)', price_key: 'precast', unit: 'm2' },
            monolithic: { name: 'Монолитное', price_key: 'monolithic', unit: 'm3' },
            none:       { name: 'ОТСУТСТВУЕТ', price_key: null, unit: 'm2' }
        },
        default: 'wooden'
    },
    floor_intermediate: {
        label: 'Межэтажное перекрытие',
        options: {
            wooden:     { name: 'Деревянное (по балкам)', price_key: 'wooden', unit: 'm2' },
            precast:    { name: 'Сборное (пустотные плиты)', price_key: 'precast', unit: 'm2' },
            monolithic: { name: 'Монолитное', price_key: 'monolithic', unit: 'm3' },
            none:       { name: 'ОТСУТСТВУЕТ', price_key: null, unit: 'm2' }
        },
        default: 'precast'
    },
    floor_attic: {
        label: 'Чердачное перекрытие',
        options: {
            wooden:     { name: 'Деревянное (по балкам)', price_key: 'wooden', unit: 'm2' },
            precast:    { name: 'Сборное (пустотные плиты)', price_key: 'precast', unit: 'm2' },
            monolithic: { name: 'Монолитное', price_key: 'monolithic', unit: 'm3' },
            none:       { name: 'ОТСУТСТВУЕТ', price_key: null, unit: 'm2' }
        },
        default: 'wooden'
    },
    roof: {
        label: 'Тип кровли',
        options: {
            metal:      { name: 'Металлочерепица', price_key: 'metal', unit: 'm2' },
            clickfaltz: { name: 'Клик-фальц', price_key: 'clickfaltz', unit: 'm2' },
            none:       { name: 'ОТСУТСТВУЕТ', price_key: 'none', unit: 'm2' }
        },
        default: 'metal'
    },
    gutter: {
        label: 'Водосточная система',
        options: {
            present:    { name: 'Есть', price_key: 'present', unit: 'm' },
            none:       { name: 'ОТСУТСТВУЕТ', price_key: 'none', unit: 'm' }
        },
        default: 'present'
    },
    windows: {
        label: 'Тип окон',
        options: {
            economy:    { name: 'Без ламинации', price_key: 'economy', unit: 'm2' },
            standard:   { name: 'ПВХ с ламинацией (1 сторона)', price_key: 'standard', unit: 'm2' },
            none:       { name: 'ОТСУТСТВУЕТ', price_key: 'none', unit: 'm2' }
        },
        default: 'standard'
    },
    door_main: {
        label: 'Входная дверь',
        options: {
            present:    { name: 'Входная дверь (временная)', price_key: 'present', unit: 'шт' },
            none:       { name: 'ОТСУТСТВУЕТ', price_key: 'none', unit: 'шт' }
        },
        default: 'present'
    },
    armopoyas: {
        label: 'Армопояс',
        options: {
            present:    { name: 'Армопояс', price_key: 'present', unit: 'м' },
            none:       { name: 'ОТСУТСТВУЕТ', price_key: 'none', unit: 'м' }
        },
        default: 'present'
    }
};

// ---------- ЭКСПОРТ ----------
window.DATA = {
    prices: PRICES,
    consts: CONSTS,
    coefficients: COEFFICIENTS,
    categories: CATEGORIES
};