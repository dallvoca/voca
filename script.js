// 데이터 구조
class Word {
    constructor(word, meanings, examples) {
        this.word = word;
        this.meanings = meanings; // String[]
        this.examples = examples; // String[]
    }
}

class Day {
    constructor(dayNumber, words) {
        this.dayNumber = dayNumber;
        this.words = words; // Word[]
    }
}

// 샘플 데이터 생성
const vocabularyData = [];

// Day 1-30까지 샘플 데이터 생성
for (let dayNum = 1; dayNum <= 10; dayNum++) {
    const words = [];
    
    // 각 Day마다 10개 단어 생성 (예시)
    for (let i = 1; i <= 10; i++) {
        const wordNum = (dayNum - 1) * 10 + i;
        words.push(new Word(
            `Word${wordNum}`,
            [
                `의미 ${wordNum}-1`,
                `의미 ${wordNum}-2`,
                `의미 ${wordNum}-3`
            ],
            [
                `This is an example sentence ${wordNum}-1 using Word${wordNum}.`,
                `Another example ${wordNum}-2 demonstrates how to use Word${wordNum} in context.`,
                `Here's a third example ${wordNum}-3 showing Word${wordNum} usage.`
            ]
        ));
    }
    
    vocabularyData.push(new Day(dayNum, words));
}

// 더 현실적인 샘플 데이터 추가 (실제 영어 단어들)
vocabularyData[0] = new Day(1, [
    new Word("abandon", ["버리다", "포기하다", "유기하다"], [
        "They had to abandon the car because it was stuck in the mud.",
        "She decided to abandon her studies and travel the world.",
        "The captain was the last to abandon the sinking ship."
    ]),
    new Word("ability", ["능력", "재능", "능숙함"], [
        "She has the ability to speak five languages fluently.",
        "His mathematical ability impressed all his teachers.",
        "The team's ability to work under pressure led to their success."
    ]),
    new Word("abroad", ["해외로", "외국에", "넓게"], [
        "I'm planning to study abroad next year.",
        "Many students dream of traveling abroad.",
        "She has lived abroad for most of her adult life."
    ]),
    new Word("absence", ["부재", "결석", "없음"], [
        "Your absence was noticed at the meeting.",
        "The absence of evidence doesn't prove anything.",
        "He returned after a long absence from work."
    ]),
    new Word("absorb", ["흡수하다", "몰두하다", "이해하다"], [
        "Plants absorb carbon dioxide from the air.",
        "I was so absorbed in the book that I didn't hear the phone.",
        "The sponge can absorb a lot of water."
    ]),
    new Word("abstract", ["추상적인", "요약", "이론적인"], [
        "Abstract art can be difficult to understand.",
        "Please write an abstract of your research paper.",
        "The concept is too abstract for me to grasp."
    ]),
    new Word("abundant", ["풍부한", "많은", "충분한"], [
        "The region has abundant natural resources.",
        "We have an abundant supply of fresh water.",
        "She has abundant knowledge about the subject."
    ]),
    new Word("academic", ["학술적인", "이론적인", "학생의"], [
        "She has a strong academic background.",
        "The academic year starts in September.",
        "This is more of an academic question than a practical one."
    ]),
    new Word("accept", ["받아들이다", "수락하다", "인정하다"], [
        "I accept your apology.",
        "She accepted the job offer immediately.",
        "We need to accept the fact that things have changed."
    ]),
    new Word("access", ["접근", "이용", "접근권"], [
        "You need a password to access this file.",
        "The building has wheelchair access.",
        "Students have full access to the library."
    ])
]);

vocabularyData[1] = new Day(2, [
    new Word("accident", ["사고", "우발적 사건", "우연"], [
        "There was a serious car accident on the highway.",
        "I met her by accident at the grocery store.",
        "The discovery was made by accident, not by design."
    ]),
    new Word("accomplish", ["성취하다", "완수하다", "달성하다"], [
        "We need to accomplish our goals by the end of the year.",
        "She has accomplished great things in her career.",
        "What did you accomplish today?"
    ]),
    new Word("account", ["계정", "계좌", "설명"], [
        "Please create an account to continue.",
        "I need to check my bank account balance.",
        "Can you account for your absence yesterday?"
    ]),
    new Word("accurate", ["정확한", "정밀한", "신뢰할 수 있는"], [
        "The measurements need to be accurate.",
        "Her prediction turned out to be accurate.",
        "We need accurate information before making a decision."
    ]),
    new Word("achieve", ["달성하다", "성취하다", "이루다"], [
        "You can achieve anything if you work hard.",
        "She achieved her dream of becoming a doctor.",
        "The team achieved victory after a long struggle."
    ]),
    new Word("acknowledge", ["인정하다", "인지하다", "감사하다"], [
        "I acknowledge that I made a mistake.",
        "Please acknowledge receipt of this email.",
        "She acknowledged the applause with a smile."
    ]),
    new Word("acquire", ["획득하다", "얻다", "습득하다"], [
        "The company wants to acquire a smaller competitor.",
        "It takes time to acquire new language skills.",
        "She has acquired a lot of experience in this field."
    ]),
    new Word("adapt", ["적응하다", "조정하다", "각색하다"], [
        "You need to adapt to the new environment.",
        "The movie was adapted from a popular novel.",
        "Plants adapt to survive in different climates."
    ]),
    new Word("adequate", ["충분한", "적절한", "적당한"], [
        "The food supplies were adequate for the journey.",
        "Is your salary adequate for your needs?",
        "We need adequate time to prepare."
    ]),
    new Word("adjust", ["조정하다", "맞추다", "적응하다"], [
        "Please adjust your schedule accordingly.",
        "You can adjust the volume with this button.",
        "It takes time to adjust to a new job."
    ])
]);

// Firebase 설정 (아래 값을 Firebase 콘솔에서 복사해 채워주세요)
const firebaseConfig = {
    apiKey: "AIzaSyDHCPS3pLfrCUWMO5T-CPZlchRdGw7PAFE",
    authDomain: "daall-voca.firebaseapp.com",
    projectId: "daall-voca",
    storageBucket: "daall-voca.firebasestorage.app",
    messagingSenderId: "693223678500",
    appId: "1:693223678500:web:e95f562b1667a60e93aeb1",
    measurementId: "G-YHQL6VY62D"
};

// 현재 상태
let currentDay = null;
let currentWord = null;
let currentWordIndex = null;
let currentDayNumber = null;
let currentUser = null; // Firebase Auth 사용자
let db = null; // Firestore 인스턴스

// localStorage 관리 함수
function getWordId(dayNumber, wordIndex) {
    return `day${dayNumber}_word${wordIndex}`;
}

function getWrongCount(dayNumber, wordIndex) {
    const wordId = getWordId(dayNumber, wordIndex);
    const stored = localStorage.getItem('wrongWords');
    if (!stored) return 0;
    const wrongWords = JSON.parse(stored);
    return wrongWords[wordId] || 0;
}

async function setWrongCount(dayNumber, wordIndex, count, wordText) {
    const wordId = getWordId(dayNumber, wordIndex);
    const stored = localStorage.getItem('wrongWords');
    let wrongWords = stored ? JSON.parse(stored) : {};

    if (count > 0) {
        wrongWords[wordId] = count;
    } else {
        delete wrongWords[wordId];
    }

    localStorage.setItem('wrongWords', JSON.stringify(wrongWords));

    // 서버 동기화 (로그인 상태일 때만)
    if (currentUser && db) {
        try {
            await saveWrongCountToServer(wordId, {
                count,
                dayNumber,
                wordIndex,
                word: wordText || ''
            });
        } catch (e) {
            console.error('서버 저장 실패:', e);
        }
    }

    return count;
}

async function incrementWrongCount(dayNumber, wordIndex, wordText) {
    const current = getWrongCount(dayNumber, wordIndex);
    return await setWrongCount(dayNumber, wordIndex, current + 1, wordText);
}

async function resetWrongCount(dayNumber, wordIndex, wordText) {
    return await setWrongCount(dayNumber, wordIndex, 0, wordText);
}

function getAllWrongWords() {
    const stored = localStorage.getItem('wrongWords');
    if (!stored) return [];
    const wrongWords = JSON.parse(stored);
    const result = [];
    
    vocabularyData.forEach(day => {
        day.words.forEach((word, wordIndex) => {
            const wordId = getWordId(day.dayNumber, wordIndex);
            if (wrongWords[wordId] && wrongWords[wordId] > 0) {
                result.push({
                    dayNumber: day.dayNumber,
                    wordIndex: wordIndex,
                    word: word,
                    count: wrongWords[wordId]
                });
            }
        });
    });
    
    return result;
}

function getDayWrongCount(dayNumber) {
    const stored = localStorage.getItem('wrongWords');
    if (!stored) return 0;
    const wrongWords = JSON.parse(stored);
    let count = 0;
    
    vocabularyData[dayNumber - 1].words.forEach((word, wordIndex) => {
        const wordId = getWordId(dayNumber, wordIndex);
        if (wrongWords[wordId] && wrongWords[wordId] > 0) {
            count++;
        }
    });
    
    return count;
}

function updateReviewCount() {
    const wrongWords = getAllWrongWords();
    $('#review-count').text(wrongWords.length);
}

// Firebase 초기화 및 인증 처리
async function initializeFirebase() {
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_API_KEY") {
        console.warn("Firebase config가 설정되지 않았습니다. 로컬 모드로 동작합니다.");
        return;
    }
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        const auth = firebase.auth();

        // 단어 데이터 로드 (Firebase에서 먼저 시도)
        await loadVocabularyDataFromFirebase();

        auth.onAuthStateChanged(async (user) => {
            currentUser = user;
            await handleAuthChange(user);
        });
    } catch (e) {
        console.error("Firebase 초기화 실패:", e);
    }
}

// Firebase에서 단어 데이터 로드
async function loadVocabularyDataFromFirebase() {
    if (!db) {
        console.log('Firestore가 초기화되지 않았습니다. 하드코딩 데이터를 사용합니다.');
        return;
    }
    
    try {
        const vocabRef = db.collection('vocabulary');
        const snapshot = await vocabRef.orderBy('dayNumber').get();
        
        if (!snapshot.empty) {
            // Firebase에 데이터가 있으면 사용
            vocabularyData.length = 0; // 기존 데이터 초기화
            snapshot.forEach(doc => {
                const data = doc.data();
                const words = data.words.map(w => new Word(w.word, w.meanings, w.examples));
                vocabularyData.push(new Day(data.dayNumber, words));
            });
            console.log(`✅ Firebase에서 ${vocabularyData.length}개 Day 데이터 로드 완료`);
            
            // UI 업데이트
            initializeDays();
            if (currentDayNumber) {
                showWordList(currentDayNumber);
            }
            return true; // Firebase 데이터 사용
        } else {
            console.log('⚠️ Firebase에 단어 데이터가 없습니다. 하드코딩 데이터를 사용합니다.');
            console.log('💡 초기 데이터를 Firebase에 저장하려면 콘솔에서 saveInitialVocabularyToFirebase() 실행');
            return false; // 하드코딩 데이터 사용
        }
    } catch (e) {
        console.error('❌ 단어 데이터 로드 실패:', e);
        console.log('하드코딩 데이터를 사용합니다.');
        return false;
    }
}

// Firebase에 초기 단어 데이터 저장 (관리용)
// 브라우저 콘솔에서 호출: await saveInitialVocabularyToFirebase()
async function saveInitialVocabularyToFirebase() {
    if (!db) {
        console.error('❌ Firestore가 초기화되지 않았습니다.');
        return;
    }
    
    if (vocabularyData.length === 0) {
        console.error('❌ 저장할 데이터가 없습니다.');
        return;
    }
    
    try {
        console.log('📤 Firebase에 단어 데이터 저장 중...');
        const batch = db.batch();
        vocabularyData.forEach(day => {
            const dayRef = db.collection('vocabulary').doc(`day${day.dayNumber}`);
            batch.set(dayRef, {
                dayNumber: day.dayNumber,
                words: day.words.map(w => ({
                    word: w.word,
                    meanings: w.meanings,
                    examples: w.examples
                }))
            }, { merge: true }); // merge로 기존 데이터 유지하면서 업데이트
        });
        await batch.commit();
        console.log(`✅ Firebase에 ${vocabularyData.length}개 Day 데이터 저장 완료!`);
        console.log('🔄 페이지를 새로고침하면 Firebase에서 데이터를 불러옵니다.');
    } catch (e) {
        console.error('❌ 초기 데이터 저장 실패:', e);
    }
}

// Day 단어 데이터 덮어씌우기 (기존 데이터 완전히 교체)
// 사용법: await saveDay(1, [ {word: "...", meanings: [...], examples: [...]}, ... ])
async function saveDay(dayNumber, words) {
    if (!db) {
        console.error('❌ Firestore가 초기화되지 않았습니다.');
        console.log('💡 먼저 Google로 로그인해주세요.');
        return;
    }
    
    if (!Array.isArray(words) || words.length === 0) {
        console.error('❌ words는 비어있지 않은 배열이어야 합니다.');
        return;
    }
    
    try {
        // 데이터 정리 및 검증
        const cleanWords = words.map((w, index) => {
            if (!w.word) {
                console.warn(`⚠️ ${index + 1}번째 단어에 word가 없습니다. 건너뜁니다.`);
                return null;
            }
            return {
                word: String(w.word).trim(),
                meanings: Array.isArray(w.meanings) ? w.meanings.map(m => String(m).trim()) : [],
                examples: Array.isArray(w.examples) ? w.examples.map(e => String(e).trim()) : []
            };
        }).filter(w => w !== null);
        
        if (cleanWords.length === 0) {
            console.error('❌ 유효한 단어가 없습니다.');
            return;
        }
        
        const dayRef = db.collection('vocabulary').doc(`day${dayNumber}`);
        await dayRef.set({
            dayNumber: dayNumber,
            words: cleanWords
        }, { merge: true });
        
        console.log(`✅ Day ${dayNumber} 덮어씌우기 완료! (${cleanWords.length}개 단어)`);
        console.log(`🔄 페이지를 새로고침하면 반영됩니다.`);
        
        return { success: true, dayNumber, wordCount: cleanWords.length };
    } catch (e) {
        console.error('❌ 저장 실패:', e);
        return { success: false, error: e };
    }
}

// Day 단어 데이터 추가하기 (기존 단어 뒤에 새 단어 추가, 중복 제거)
// 사용법: await addDay(1, [ {word: "...", meanings: [...], examples: [...]}, ... ])
async function addDay(dayNumber, words) {
    if (!db) {
        console.error('❌ Firestore가 초기화되지 않았습니다.');
        console.log('💡 먼저 Google로 로그인해주세요.');
        return;
    }
    
    if (!Array.isArray(words) || words.length === 0) {
        console.error('❌ words는 비어있지 않은 배열이어야 합니다.');
        return;
    }
    
    try {
        // 데이터 정리 및 검증
        const cleanWords = words.map((w, index) => {
            if (!w.word) {
                console.warn(`⚠️ ${index + 1}번째 단어에 word가 없습니다. 건너뜁니다.`);
                return null;
            }
            return {
                word: String(w.word).trim(),
                meanings: Array.isArray(w.meanings) ? w.meanings.map(m => String(m).trim()) : [],
                examples: Array.isArray(w.examples) ? w.examples.map(e => String(e).trim()) : []
            };
        }).filter(w => w !== null);
        
        if (cleanWords.length === 0) {
            console.error('❌ 유효한 단어가 없습니다.');
            return;
        }
        
        const dayRef = db.collection('vocabulary').doc(`day${dayNumber}`);
        
        // 기존 데이터 불러오기
        const existingDoc = await dayRef.get();
        let existingWords = [];
        let existingCount = 0;
        
        if (existingDoc.exists) {
            const existingData = existingDoc.data();
            existingWords = existingData.words || [];
            existingCount = existingWords.length;
        }
        
        // 중복 제거 (word 기준, 대소문자 무시)
        const existingWordSet = new Set(existingWords.map(w => w.word.toLowerCase()));
        const newWordsOnly = cleanWords.filter(w => !existingWordSet.has(w.word.toLowerCase()));
        
        if (newWordsOnly.length < cleanWords.length) {
            const duplicateCount = cleanWords.length - newWordsOnly.length;
            console.warn(`⚠️ ${duplicateCount}개 단어가 이미 존재합니다. 중복은 추가하지 않습니다.`);
        }
        
        const finalWords = [...existingWords, ...newWordsOnly];
        
        await dayRef.set({
            dayNumber: dayNumber,
            words: finalWords
        }, { merge: true });
        
        console.log(`✅ Day ${dayNumber} 추가 완료! (총 ${finalWords.length}개 단어)`);
        if (existingCount > 0) {
            console.log(`   기존: ${existingCount}개, 새로 추가: ${newWordsOnly.length}개`);
        } else {
            console.log(`   새로 추가: ${newWordsOnly.length}개`);
        }
        console.log(`🔄 페이지를 새로고침하면 반영됩니다.`);
        
        return { success: true, dayNumber, wordCount: finalWords.length, added: newWordsOnly.length };
    } catch (e) {
        console.error('❌ 저장 실패:', e);
        return { success: false, error: e };
    }
}

// 전역 함수로 등록 (브라우저 콘솔에서 호출 가능)
window.saveInitialVocabularyToFirebase = saveInitialVocabularyToFirebase;
window.loadVocabularyDataFromFirebase = loadVocabularyDataFromFirebase;
window.saveDay = saveDay;  // Day 덮어씌우기
window.addDay = addDay;    // Day 단어 추가하기

async function handleAuthChange(user) {
    updateAuthUI(user);
    if (user && db) {
        // 서버 데이터 불러오기
        await syncWrongWordsFromServer();
    }
    updateReviewCount();
    initializeDays();
    if (currentDayNumber) {
        showWordList(currentDayNumber);
    }
}

function updateAuthUI(user) {
    const statusEl = $('#auth-status');
    const loginBtn = $('#login-btn');
    const logoutBtn = $('#logout-btn');

    if (user) {
        const name = user.displayName || '';
        const email = user.email || '';
        statusEl.text(`로그인: ${name || email || '사용자'}`);
        loginBtn.addClass('hidden');
        logoutBtn.removeClass('hidden');
    } else {
        statusEl.text('로그인하지 않음 (로컬 모드)');
        loginBtn.removeClass('hidden');
        logoutBtn.addClass('hidden');
    }
}

function loginWithGoogle() {
    if (!firebase.auth) return;
    const provider = new firebase.auth.GoogleAuthProvider();
    const auth = firebase.auth();

    // 파일 프로토콜(file://) 또는 팝업 불가 환경 대비: redirect로 폴백
    auth.signInWithPopup(provider).catch(err => {
        if (err.code === 'auth/operation-not-supported-in-this-environment') {
            console.warn('Popup 미지원 환경, redirect로 재시도합니다.');
            auth.signInWithRedirect(provider).catch(innerErr => {
                console.error('Redirect 로그인 실패:', innerErr);
                alert('로그인에 실패했습니다. 콘솔을 확인하세요.');
            });
            return;
        }
        console.error('로그인 실패:', err);
        alert('로그인에 실패했습니다. 콘솔을 확인하세요.');
    });
}

function logout() {
    if (!firebase.auth) return;
    firebase.auth().signOut();
}

async function saveWrongCountToServer(wordId, payload) {
    if (!db || !currentUser) return;
    const docRef = db.collection('users').doc(currentUser.uid).collection('wrongWords').doc(wordId);
    try {
        if (payload.count > 0) {
            await docRef.set(payload);
        } else {
            await docRef.delete();
        }
    } catch (e) {
        console.error('서버 저장 실패:', e);
    }
}

async function syncWrongWordsFromServer() {
    if (!db || !currentUser) return;
    const docRef = db.collection('users').doc(currentUser.uid).collection('wrongWords');
    try {
        const snapshot = await docRef.get();
        const serverData = {};
        snapshot.forEach(doc => {
            const data = doc.data();
            serverData[doc.id] = data.count || 0;
        });

        const localStored = localStorage.getItem('wrongWords');
        const localData = localStored ? JSON.parse(localStored) : {};

        // 서버 데이터가 있으면 서버 기준으로 덮어쓰기, 없으면 로컬을 서버로 업로드
        if (Object.keys(serverData).length > 0) {
            localStorage.setItem('wrongWords', JSON.stringify(serverData));
        } else if (Object.keys(localData).length > 0) {
            // 로컬 데이터를 서버로 업로드
            await Promise.all(Object.entries(localData).map(([wordId, count]) => {
                const parts = wordId.match(/day(\\d+)_word(\\d+)/);
                if (!parts) return Promise.resolve();
                const dayNumber = Number(parts[1]);
                const wordIndex = Number(parts[2]);
                const day = vocabularyData.find(d => d.dayNumber === dayNumber);
                const word = day?.words?.[wordIndex];
                return saveWrongCountToServer(wordId, {
                    count,
                    dayNumber,
                    wordIndex,
                    word: word ? word.word : ''
                });
            }));
        }
    } catch (e) {
        console.error('서버 동기화 실패:', e);
    }
}

// 초기화
$(document).ready(async function() {
    updateReviewCount();
    await initializeFirebase(); // Firebase 초기화 및 데이터 로드 완료 대기
    initializeDays();
    
    // 탭 전환
    $('#tab-study').on('click', function() {
        $(this).addClass('active');
        $('#tab-review').removeClass('active');
        $('#review-list-container').addClass('hidden');
        $('#day-list-container').removeClass('hidden');
    });
    
    $('#tab-review').on('click', function() {
        $(this).addClass('active');
        $('#tab-study').removeClass('active');
        $('#day-list-container').addClass('hidden');
        $('#word-list-container').addClass('hidden');
        showReviewList();
    });
    
    // 이벤트 리스너
    $(document).on('click', '.day-btn', function() {
        const dayNumber = $(this).data('day');
        showWordList(dayNumber);
    });
    
    $(document).on('click', '.word-btn', function() {
        const dayNumber = $(this).data('day-number');
        const wordIndex = $(this).data('word-index');
        const day = vocabularyData.find(d => d.dayNumber === dayNumber);
        showWordCard(day, wordIndex, dayNumber);
    });
    
    $('#back-to-days').on('click', function() {
        showDayList();
    });
    
    $('#close-modal').on('click', function() {
        closeWordCard();
    });
    
    $('.modal-overlay').on('click', function() {
        closeWordCard();
    });
    
    $('#login-btn').on('click', function() {
        loginWithGoogle();
    });
    
    $('#logout-btn').on('click', function() {
        logout();
    });
    
    // ESC 키로 모달 닫기
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            closeWordCard();
        }
    });
});

// Day 목록 초기화
function initializeDays() {
    const dayGrid = $('#day-grid');
    dayGrid.empty();
    
    vocabularyData.forEach(day => {
        const wrongCount = getDayWrongCount(day.dayNumber);
        const dayBtn = $('<button>')
            .addClass('day-btn')
            .data('day', day.dayNumber);
        
        const dayText = $('<span>').text(`Day ${day.dayNumber}`);
        dayBtn.append(dayText);
        
        if (wrongCount > 0) {
            const badge = $('<span>')
                .addClass('day-badge')
                .text(wrongCount);
            dayBtn.append(badge);
        }
        
        dayGrid.append(dayBtn);
    });
}

// Day 목록 보기
function showDayList() {
    $('#day-list-container').removeClass('hidden');
    $('#word-list-container').addClass('hidden');
    $('#review-list-container').addClass('hidden');
    currentDay = null;
    currentDayNumber = null;
    initializeDays(); // 배지 업데이트
}

// 단어 리스트 보기
function showWordList(dayNumber) {
    currentDay = vocabularyData.find(d => d.dayNumber === dayNumber);
    currentDayNumber = dayNumber;
    if (!currentDay) return;
    
    $('#current-day-title').text(`Day ${dayNumber} - 단어 목록`);
    const wordGrid = $('#word-grid');
    wordGrid.empty();
    
    currentDay.words.forEach((word, index) => {
        const wrongCount = getWrongCount(dayNumber, index);
        const wordBtn = $('<button>')
            .addClass('word-btn')
            .data('word-index', index)
            .data('day-number', dayNumber);
        
        const wordText = $('<span>').addClass('word-text').text(word.word);
        wordBtn.append(wordText);
        
        if (wrongCount > 0) {
            wordBtn.addClass('wrong-word');
            const wrongBadge = $('<span>')
                .addClass('word-wrong-badge')
                .html('❌');
            wordBtn.append(wrongBadge);
        }
        
        wordGrid.append(wordBtn);
    });
    
    $('#day-list-container').addClass('hidden');
    $('#word-list-container').removeClass('hidden');
    $('#review-list-container').addClass('hidden');
}

// 단어 카드 보기
function showWordCard(day, wordIndex, dayNumber) {
    if (!day || wordIndex === undefined || !dayNumber) return;
    
    const word = day.words[wordIndex];
    if (!word) return;
    
    currentWord = word;
    currentWordIndex = wordIndex;
    currentDayNumber = dayNumber;
    
    const wrongCount = getWrongCount(dayNumber, wordIndex);
    
    const wordCard = $('#word-card');
    wordCard.empty();
    
    // 단어 제목 영역
    const titleContainer = $('<div>').addClass('word-title-container');
    titleContainer.append($('<div>').addClass('word-title').text(word.word));
    
    // 버튼 컨테이너
    const buttonContainer = $('<div>').addClass('word-card-buttons');
    
    // 틀렸어요/초기화 토글 버튼
    const wrongBtn = $('<button>')
        .addClass('wrong-btn')
        .html('❌');
    
    if (wrongCount > 0) {
        wrongBtn.addClass('active');
    }
    
    wrongBtn.on('click', async function(e) {
        e.stopPropagation();
        const isMarkedWrong = wrongBtn.hasClass('active');
        const newCount = isMarkedWrong
            ? await resetWrongCount(dayNumber, wordIndex, word.word)
            : await incrementWrongCount(dayNumber, wordIndex, word.word);
        
        updateWordCardButton(wrongBtn, newCount);
        updateReviewCount();
        
        // 현재 화면이 단어 리스트면 업데이트
        if (!$('#word-list-container').hasClass('hidden') && currentDayNumber === dayNumber) {
            showWordList(dayNumber);
        }
        
        // Day 목록 업데이트
        if (!$('#day-list-container').hasClass('hidden')) {
            initializeDays();
        }
    });
    buttonContainer.append(wrongBtn);
    titleContainer.append(buttonContainer);
    wordCard.append(titleContainer);
    
    // 뜻 섹션 (클릭해서 보이기)
    const meaningsSection = $('<div>').addClass('meanings-section').addClass('hidden-meanings');
    const meaningsHeader = $('<h3>').text('뜻 (클릭하여 보기)');
    meaningsHeader.css('cursor', 'pointer');
    meaningsSection.append(meaningsHeader);
    const meaningsList = $('<ul>').addClass('meanings-list').addClass('hidden');
    word.meanings.forEach(meaning => {
        meaningsList.append($('<li>').text(meaning));
    });
    meaningsSection.append(meaningsList);
    
    // 뜻 섹션 클릭 이벤트
    meaningsSection.on('click', function() {
        if (meaningsList.hasClass('hidden')) {
            meaningsList.removeClass('hidden').addClass('visible');
            meaningsHeader.text('뜻');
            meaningsSection.removeClass('hidden-meanings');
        }
    });
    
    wordCard.append(meaningsSection);
    
    // 예문 섹션
    const examplesSection = $('<div>').addClass('examples-section');
    examplesSection.append($('<h3>').text('예문'));
    const examplesList = $('<ul>').addClass('examples-list');
    word.examples.forEach(example => {
        const li = $('<li>');
        // 단어를 강조 표시
        const highlightedExample = example.replace(
            new RegExp(word.word, 'gi'),
            `<span class="highlight">${word.word}</span>`
        );
        li.html(highlightedExample);
        examplesList.append(li);
    });
    examplesSection.append(examplesList);
    wordCard.append(examplesSection);
    
    $('#word-card-modal').removeClass('hidden');
}

function updateWordCardButton(wrongBtn, count) {
    // 틀렸어요 버튼 업데이트
    wrongBtn.empty();
    wrongBtn.html('❌');
    if (count > 0) {
        wrongBtn.addClass('active');
    } else {
        wrongBtn.removeClass('active');
    }
}

// 단어 카드 닫기
function closeWordCard() {
    $('#word-card-modal').addClass('hidden');
    currentWord = null;
    currentWordIndex = null;
}

// 복습 필요 단어 리스트 보기
function showReviewList() {
    const wrongWords = getAllWrongWords();
    const reviewGrid = $('#review-word-grid');
    reviewGrid.empty();
    
    if (wrongWords.length === 0) {
        reviewGrid.append($('<div>')
            .addClass('no-review-words')
            .text('복습이 필요한 단어가 없습니다! 🎉'));
        $('#review-list-container').removeClass('hidden');
        return;
    }
    
    wrongWords.forEach(({ dayNumber, wordIndex, word, count }) => {
        const wordBtn = $('<button>')
            .addClass('word-btn')
            .addClass('wrong-word')
            .data('word-index', wordIndex)
            .data('day-number', dayNumber);
        
        const wordText = $('<span>').addClass('word-text').text(word.word);
        wordBtn.append(wordText);
        
        const dayLabel = $('<span>')
            .addClass('word-day-label')
            .text(`Day ${dayNumber}`);
        wordBtn.append(dayLabel);
        
        reviewGrid.append(wordBtn);
    });
    
    $('#review-list-container').removeClass('hidden');
}

