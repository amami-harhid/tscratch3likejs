
declare interface BubbleDef {
    type: "say" | "think";
    text: string;
    exit: boolean;
} 
const bubble: BubbleDef = {'type': 'say', 'text': "abcdefg", 'exit': false};
const bubbleTextArr: string[] = [
    "ABCDEFG",
    "HIJKLMNOPQRSTU VWXYZ",
    "私はねこ",
];
const bubble2 = {'type': 'think', 'text': "かきくえばぁかねがなるなりほうりゅうじ", 'exit': false};
const bubbleTextArr2: string[] = [
    "かきくえばぁ鐘がなるなり法隆寺",
    "💚こんにちは💚",
    "あなたもねこだね",
    "★こんばんは★",
];

export {bubble, bubbleTextArr, bubble2, bubbleTextArr2}