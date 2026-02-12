// Translation data - Simple mock translation for demonstration
// In a real application, you would use a translation API like Google Translate API, LibreTranslate, or DeepL
const translations = {
    'hello': {
        'es': 'hola',
        'fr': 'bonjour',
        'de': 'hallo',
        'it': 'ciao',
        'pt': 'olá',
        'ru': 'привет',
        'ja': 'こんにちは',
        'ko': '안녕하세요',
        'zh': '你好',
        'ar': 'مرحبا',
        'hi': 'नमस्ते'
    },
    'goodbye': {
        'es': 'adiós',
        'fr': 'au revoir',
        'de': 'auf wiedersehen',
        'it': 'arrivederci',
        'pt': 'adeus',
        'ru': 'до свидания',
        'ja': 'さようなら',
        'ko': '안녕히 가세요',
        'zh': '再见',
        'ar': 'وداعا',
        'hi': 'अलविदा'
    },
    'thank you': {
        'es': 'gracias',
        'fr': 'merci',
        'de': 'danke',
        'it': 'grazie',
        'pt': 'obrigado',
        'ru': 'спасибо',
        'ja': 'ありがとう',
        'ko': '감사합니다',
        'zh': '谢谢',
        'ar': 'شكرا',
        'hi': 'धन्यवाद'
    },
    'how are you': {
        'es': '¿cómo estás?',
        'fr': 'comment allez-vous',
        'de': 'wie geht es dir',
        'it': 'come stai',
        'pt': 'como você está',
        'ru': 'как дела',
        'ja': 'お元気ですか',
        'ko': '어떻게 지내세요',
        'zh': '你好吗',
        'ar': 'كيف حالك',
        'hi': 'आप कैसे हैं'
    },
    'good morning': {
        'es': 'buenos días',
        'fr': 'bonjour',
        'de': 'guten morgen',
        'it': 'buongiorno',
        'pt': 'bom dia',
        'ru': 'доброе утро',
        'ja': 'おはようございます',
        'ko': '좋은 아침',
        'zh': '早上好',
        'ar': 'صباح الخير',
        'hi': 'सुप्रभात'
    },
    'good night': {
        'es': 'buenas noches',
        'fr': 'bonne nuit',
        'de': 'gute nacht',
        'it': 'buona notte',
        'pt': 'boa noite',
        'ru': 'спокойной ночи',
        'ja': 'おやすみなさい',
        'ko': '안녕히 주무세요',
        'zh': '晚安',
        'ar': 'تصبح على خير',
        'hi': 'शुभ रात्रि'
    },
    'yes': {
        'es': 'sí',
        'fr': 'oui',
        'de': 'ja',
        'it': 'sì',
        'pt': 'sim',
        'ru': 'да',
        'ja': 'はい',
        'ko': '네',
        'zh': '是',
        'ar': 'نعم',
        'hi': 'हाँ'
    },
    'no': {
        'es': 'no',
        'fr': 'non',
        'de': 'nein',
        'it': 'no',
        'pt': 'não',
        'ru': 'нет',
        'ja': 'いいえ',
        'ko': '아니요',
        'zh': '不',
        'ar': 'لا',
        'hi': 'नहीं'
    },
    'please': {
        'es': 'por favor',
        'fr': 's\'il vous plaît',
        'de': 'bitte',
        'it': 'per favore',
        'pt': 'por favor',
        'ru': 'пожалуйста',
        'ja': 'お願いします',
        'ko': '제발',
        'zh': '请',
        'ar': 'من فضلك',
        'hi': 'कृपया'
    },
    'welcome': {
        'es': 'bienvenido',
        'fr': 'bienvenue',
        'de': 'willkommen',
        'it': 'benvenuto',
        'pt': 'bem-vindo',
        'ru': 'добро пожаловать',
        'ja': 'ようこそ',
        'ko': '환영합니다',
        'zh': '欢迎',
        'ar': 'أهلا بك',
        'hi': 'स्वागत'
    }
};

// DOM Elements
const sourceText = document.getElementById('source-text');
const targetText = document.getElementById('target-text');
const sourceLang = document.getElementById('source-lang');
const targetLang = document.getElementById('target-lang');
const swapBtn = document.getElementById('swap-btn');
const translateBtn = document.getElementById('translate-btn');
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');
const charCount = document.getElementById('char-count');

// Event Listeners
sourceText.addEventListener('input', updateCharCount);
translateBtn.addEventListener('click', translateText);
clearBtn.addEventListener('click', clearText);
copyBtn.addEventListener('click', copyTranslation);
swapBtn.addEventListener('click', swapLanguages);

// Auto-translate on input (with debounce)
let debounceTimer;
sourceText.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        if (sourceText.value.trim()) {
            translateText();
        } else {
            targetText.value = '';
        }
    }, 500);
});

// Update character count
function updateCharCount() {
    const count = sourceText.value.length;
    charCount.textContent = `${count} / 5000`;
}

// Simple translation function
function translateText() {
    const text = sourceText.value.trim().toLowerCase();
    const target = targetLang.value;
    
    if (!text) {
        targetText.value = '';
        return;
    }
    
    // Show loading state
    translateBtn.disabled = true;
    translateBtn.textContent = 'Translating...';
    
    // Simulate API delay
    setTimeout(() => {
        let translated = '';
        
        // Try to find translation in our mock database
        if (translations[text] && translations[text][target]) {
            translated = translations[text][target];
        } else {
            // Try word-by-word translation
            const words = text.split(' ');
            const translatedWords = words.map(word => {
                if (translations[word] && translations[word][target]) {
                    return translations[word][target];
                }
                return word; // Return original if no translation found
            });
            translated = translatedWords.join(' ');
        }
        
        // If still no translation, provide a message
        if (translated === text) {
            translated = `[Translation: ${text}] (Mock translation - in a real app, this would use an API)`;
        }
        
        targetText.value = translated;
        translateBtn.disabled = false;
        translateBtn.textContent = 'Translate';
    }, 300);
}

// Clear text
function clearText() {
    sourceText.value = '';
    targetText.value = '';
    updateCharCount();
}

// Copy translation
function copyTranslation() {
    if (targetText.value) {
        navigator.clipboard.writeText(targetText.value).then(() => {
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('copied');
            
            setTimeout(() => {
                copyBtn.textContent = 'Copy';
                copyBtn.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy text');
        });
    }
}

// Swap languages
function swapLanguages() {
    // Don't swap if source is auto-detect
    if (sourceLang.value === 'auto') {
        return;
    }
    
    // Swap language selections
    const tempLang = sourceLang.value;
    sourceLang.value = targetLang.value;
    targetLang.value = tempLang;
    
    // Swap text content
    const tempText = sourceText.value;
    sourceText.value = targetText.value;
    targetText.value = tempText;
    
    // Update char count
    updateCharCount();
    
    // Re-translate if there's text
    if (sourceText.value.trim()) {
        translateText();
    }
}

// Initialize
updateCharCount();
