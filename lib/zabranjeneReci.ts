const zabranjeneReci = [
  // Droge
  "droga",
  "kokain",
  "heroin",
  "marihuana",
  "ekstazi",
  "metamfetamin",
  "narkotik",
  // Oružje
  "pištolj",
  "pistolj",
  "puška",
  "puska",
  "nož",
  "noz",
  "oružje",
  "bomba",
  "municija",
  "eksploziv",
  // Nasilje
  "ubistvo",
  "nasilje",
  "silovanje",
  "zlostavljanje",
  "pretnja",
  "terorizam",
  // Diskriminacija i mržnja
  "rasizam",
  "homofobija",
  "antisemitizam",
  "seksizam",
  "mržnja",
  // Pornografija i nepristojan sadržaj
  "pornografija",
  "seks",
  "nasilje nad decom",
  "pedofilija",
  "vulgarne reči",
  // Finansijske prevare
  "prevara",
  "pranje novca",
  "krivotvorenje",
  "hakovanje",
  // Trgovina ljudima
  "trgovina ljudima",
  "seksualna eksploatacija",
  "roblje",
  //srpske reči
  "jebem",
  "jebeš",
  "jebe",
  "jebemo",
  "jebete",
  "jebu",
  "jebo",
  "jebala",
  "jebalo",
  "jebali",
  "jebaću",
  "jebiga",
  "jebote",
  "jebač",
  "jebačina",
  "kurac",
  "kurca",
  "kurcu",
  "kurcem",
  "kurčina",
  "kurčevi",
  "picka",
  "picku",
  "pickom",
  "pickama",
  "pička",
  "pičke",
  "pički",
  "pičku",
  "pičkom",
  "pizda",
  "pizde",
  "pizdi",
  "pizdu",
  "pizdom",
  "govno",
  "govna",
  "govnu",
  "govnom",
  "govnima",
  "sranje",
  "sranja",
  "sranju",
  "sranjem",
  "dupe",
  "dupeta",
  "dupetu",
  "dupetom",
  "supak",
  "supka",
  "supku",
  "supkom",
  "šupak",
  "šupka",
  "šupku",
  "šupkom",
  "kenjati",
  "kenjam",
  "kenjaš",
  "kenja",
  "kenjamo",
  "kenjate",
  "kenjaju",
  "sisa",
  "sise",
  "sisi",
  "sisu",
  "sisom",
  "sisama",
  "muda",
  "muda",
  "mudima",
  "karanje",
  "karanja",
  "karanju",
  "karanjem",
  "pusiti",
  "pusim",
  "pusis",
  "pusima",
  "pusite",
  "pusiti",
  "pušiti",
  "pušim",
  "pušiš",
  "puši",
  "pušimo",
  "pušite",
  "puše",
  "drolja",
  "drolje",
  "drolji",
  "drolju",
  "droljom",
  "kurva",
  "kurve",
  "kurvi",
  "kurvu",
  "kurvom",
  "kucka",
  "kucku",
  "kuckom",
  "kučka",
  "kučke",
  "kučki",
  "kučku",
  "kučkom",
  "proklet",
  "prokleta",
  "prokleto",
  "prokleti",
  "proklete",
  "djubre",
  "djubreta",
  "djubretu",
  "djubretom",
  "đubre",
  "đubreta",
  "đubretu",
  "đubretom",
  "đubrad",
  "majmun",
  "majmune",
  "majmuna",
  "majmunom",
  "kreten",
  "kretenu",
  "kretena",
  "kretenom",
  "budala",
  "budale",
  "budali",
  "budalu",
  "budalom",
  "idiot",
  "idiota",
  "idiotu",
  "idiotom",
  "glupan",
  "glupana",
  "glupanu",
  "glupanom",
  "debil",
  "debila",
  "debilu",
  "debilom",
  "moron",
  "morona",
  "moronu",
  "moronom",
  "seljak",
  "seljaka",
  "seljaku",
  "seljakom",
  "stoka",
  "stoke",
  "stoki",
  "stoku",
  "stokom",
  "govedo",
  "goveda",
  "govedu",
  "govedom",
  "svinja",
  "svinje",
  "svinji",
  "svinju",
  "svinjom",
  "krmak",
  "krmka",
  "krmku",
  "krmkom",
  "skot",
  "skota",
  "skotu",
  "skotom",
  "gad",
  "gada",
  "gadu",
  "gadom",
  "fuksa",
  "fukse",
  "fuksi",
  "fuksu",
  "fuksom",
  "drkati",
  "drkam",
  "drkas",
  "drkaš",
  "drka",
  "drkamo",
  "drkate",
  "drkaju",
  "izdrkati",
  "izdrkam",
  "izdrkaš",
  "izdrka",
  "izdrkamo",
  "izdrkate",
  "izdrkaju",
  "nabiti",
  "nabijem",
  "nabiješ",
  "nabije",
  "nabijemo",
  "nabijete",
  "nabiju",
  "napakovati",
  "napakujem",
  "napakuješ",
  "napakujes",
  "napakuje",
  "napakujemo",
  "napakujete",
  "napakuju",
  "otegnuti",
  "otegnem",
  "otegnes",
  "otegneš",
  "otegne",
  "otegnemo",
  "otegnete",
  "otegnu",
  "crkni",
  "crknuti",
  "crknem",
  "crkneš",
  "crkne",
  "crknemo",
  "crknete",
  "crknu",
  "mamicu",
  "mamicuti",
  "mamicumu",
  "materinu",
  "materinuti",
  "materinumu",
  "marš",
  "mars",
  "mrš",
  "mrs",
  "odjebi",
  "odjebite",
  "trpati",
  "trpam",
  "trpaš",
  "trpa",
  "trpamo",
  "trpate",
  "trpaju",
  "nabijati",
  "nabijam",
  "nabijaš",
  "nabija",
  "nabijamo",
  "nabijate",
  "nabijaju",
  "nakačiti",
  "nakačim",
  "nakačiš",
  "nakači",
  "nakačimo",
  "nakačite",
  "nakače",
  "nakaciti",
  "nakacim",
  "nakacis",
  "nakaci",
  "nakacimo",
  "nakacite",
  "nakacaju",
  "zajebati",
  "zajebem",
  "zajebeš",
  "zajebe",
  "zajebemo",
  "zajebete",
  "zajebu",
  "zajebavati",
  "zajebavam",
  "zajebavaš",
  "zajebava",
  "zajebavamo",
  "zajebavate",
  "zajebavaju",
  "usrati",
  "userem",
  "usereš",
  "usere",
  "useremo",
  "userete",
  "useru",
  "usrati se",
  "userem se",
  "usereš se",
  "useres se",
  "usere se",
  "useremo se",
  "userete se",
  "useru se",
  "posrati",
  "poserem",
  "posereš",
  "posere",
  "poseremo",
  "poserete",
  "poseru",
  "posrati se",
  "poserem se",
  "posereš se",
  "posere se",
  "poseremo se",
  "poserete se",
  "poseru se",
  "izdrkanost",
  "izdrkanošu",
  "najebati",
  "najebaću",
  "najebo",
  "najebem",
  "najebeš",
  "najebe",
  "najebemo",
  "najebete",
  "najebu",
  "popušiti",
  "popušim",
  "popušiš",
  "popuši",
  "popušimo",
  "popušite",
  "popuše",
  "dudlati",
  "dudlam",
  "dudlaš",
  "dudla",
  "dudlamo",
  "dudlate",
  "dudlaju",
  "lizati",
  "ližem",
  "ližeš",
  "liže",
  "ližemo",
  "ližete",
  "ližu",
  "čmar",
  "čmara",
  "čmaru",
  "čmarom",
  "šupčina",
  "šupčine",
  "šupčini",
  "šupčinu",
  "šupčinom",
  "supcina",
  "supcine",
  "supcini",
  "supcinu",
  "supcinom",
  "govnjar",
  "govnjara",
  "govnjaru",
  "govnjarom",
  "govnarija",
  "govnarije",
  "govnariji",
  "govnariju",
  "govnarijom",
  "pizdarija",
  "pizdarije",
  "pizdariji",
  "pizdariju",
  "pizdarijom",
  "pičkaranje",
  "pičkaranja",
  "pičkaranju",
  "pičkaranjem",
  "kurčenje",
  "kurčenja",
  "kurčenju",
  "kurčenjem",
  "kurcenje",
  "kurcenja",
  "kurcenji",
  "kurcenju",
  "kurcenjem",
  "jebivetar",
  "jebivetra",
  "jebivetru",
  "jebivetrom",
  "drkadžija",
  "drkadžije",
  "drkadžiji",
  "drkadžiju",
  "drkadžijom",
  "drkadzija",
  "drkadzije",
  "drkadziji",
  "drkadziju",
  "drkadzijom",
  "drkošević",
  "drkoševića",
  "drkoševiću",
  "drkoševićem",
  "drkosveci",
  "drkosveca",
  "drkosvecu",
  "drkosvecu",
  "drkosvecom",
  "pizdek",
  "pizdeka",
  "pizdeku",
  "pizdekom",
  // Ostale ilegalne aktivnosti
  "prodaja organa",
  "piraterija",
  "krijumčarenje",
  "abbo",
  "abortion",
  "abuse",
  "addict",
  "addicts",
  "adult",
  "africa",
  "african",
  "alligatorbait",
  "amateur",
  "american",
  "anal",
  "analannie",
  "analsex",
  "angie",
  "angry",
  "anus",
  "areola",
  "argie",
  "aroused",
  "arse",
  "arsehole",
  "asian",
  "ass",
  "assassin",
  "assassinate",
  "assassination",
  "assault",
  "assbagger",
  "assblaster",
  "assclown",
  "asscowboy",
  "asses",
  "assfuck",
  "assfucker",
  "asshat",
  "asshole",
  "assholes",
  "asshore",
  "assjockey",
  "asskiss",
  "asskisser",
  "assklown",
  "asslick",
  "asslicker",
  "asslover",
  "assman",
  "assmonkey",
  "assmunch",
  "assmuncher",
  "asspacker",
  "asspirate",
  "asspuppies",
  "assranger",
  "asswhore",
  "asswipe",
  "athletesfoot",
  "attack",
  "australian",
  "babe",
  "babies",
  "backdoor",
  "backdoorman",
  "backseat",
  "badfuck",
  "balllicker",
  "balls",
  "ballsack",
  "banging",
  "baptist",
  "barelylegal",
  "barf",
  "barface",
  "barfface",
  "bast",
  "bastard",
  "bazongas",
  "bazooms",
  "beaner",
  "beast",
  "beastality",
  "beastial",
  "beastiality",
  "beatoff",
  "beat-off",
  "beatyourmeat",
  "beaver",
  "bestial",
  "bestiality",
  "bi",
  "biatch",
  "bible",
  "bicurious",
  "bigass",
  "bigbastard",
  "bigbutt",
  "bigger",
  "bisexual",
  "bi-sexual",
  "bitch",
  "bitcher",
  "bitches",
  "bitchez",
  "bitchin",
  "bitching",
  "bitchslap",
  "bitchy",
  "biteme",
  "black",
  "blackman",
  "blackout",
  "blacks",
  "blind",
  "blow",
  "blowjob",
  "boang",
  "bogan",
  "bohunk",
  "bollick",
  "bollock",
  "bomb",
  "bombers",
  "bombing",
  "bombs",
  "bomd",
  "bondage",
  "boner",
  "bong",
  "boob",
  "boobies",
  "boobs",
  "booby",
  "boody",
  "boom",
  "boong",
  "boonga",
  "boonie",
  "booty",
  "bootycall",
  "bountybar",
  "brea5t",
  "breast",
  "breastjob",
  "breastlover",
  "breastman",
  "brothel",
  "bugger",
  "buggered",
  "buggery",
  "bullcrap",
  "bulldike",
  "bulldyke",
  "bullshit",
  "bumblefuck",
  "bumfuck",
  "bunga",
  "bunghole",
  "buried",
  "burn",
  "butchbabes",
  "butchdike",
  "butchdyke",
  "butt",
  "buttbang",
  "butt-bang",
  "buttface",
  "buttfuck",
  "butt-fuck",
  "buttfucker",
  "butt-fucker",
  "buttfuckers",
  "butt-fuckers",
  "butthead",
  "buttman",
  "buttmunch",
  "buttmuncher",
  "buttpirate",
  "buttplug",
  "buttstain",
  "byatch",
  "cacker",
  "cameljockey",
  "cameltoe",
  "canadian",
  "cancer",
  "carpetmuncher",
  "carruth",
  "catholic",
  "catholics",
  "cemetery",
  "chav",
  "cherrypopper",
  "chickslick",
  "children's",
  "chin",
  "chinaman",
  "chinamen",
  "chinese",
  "chink",
  "chinky",
  "choad",
  "chode",
  "christ",
  "christian",
  "church",
  "cigarette",
  "cigs",
  "clamdigger",
  "clamdiver",
  "clit",
  "clitoris",
  "clogwog",
  "cocaine",
  "cock",
  "cockblock",
  "cockblocker",
  "cockcowboy",
  "cockfight",
  "cockhead",
  "cockknob",
  "cocklicker",
  "cocklover",
  "cocknob",
  "cockqueen",
  "cockrider",
  "cocksman",
  "cocksmith",
  "cocksmoker",
  "cocksucer",
  "cocksuck",
  "cocksucked",
  "cocksucker",
  "cocksucking",
  "cocktail",
  "cocktease",
  "cocky",
  "cohee",
  "coitus",
  "commie",
  "communist",
  "condom",
  "conservative",
  "conspiracy",
  "coolie",
  "cooly",
  "coon",
  "coondog",
  "copulate",
  "cornhole",
  "corruption",
  "cra5h",
  "crabs",
  "crack",
  "crackpipe",
  "crackwhore",
  "crack-whore",
  "crap",
  "crapola",
  "crapper",
  "crappy",
  "crash",
  "creamy",
  "crime",
  "crimes",
  "criminal",
  "criminals",
  "crotch",
  "crotchjockey",
  "crotchmonkey",
  "crotchrot",
  "cum",
  "cumbubble",
  "cumfest",
  "cumjockey",
  "cumm",
  "cummer",
  "cumming",
  "cumquat",
  "cumqueen",
  "cumshot",
  "cunilingus",
  "cunillingus",
  "cunn",
  "cunnilingus",
  "cunntt",
  "cunt",
  "cunteyed",
  "cuntfuck",
  "cuntfucker",
  "cuntlick",
  "cuntlicker",
  "cuntlicking",
  "cuntsucker",
  "cybersex",
  "cyberslimer",
  "dago",
  "dahmer",
  "dammit",
  "damn",
  "damnation",
  "damnit",
  "darkie",
  "darky",
  "datnigga",
  "dead",
  "deapthroat",
  "death",
  "deepthroat",
  "defecate",
  "dego",
  "demon",
  "deposit",
  "desire",
  "destroy",
  "deth",
  "devil",
  "devilworshipper",
  "dick",
  "dickbrain",
  "dickforbrains",
  "dickhead",
  "dickless",
  "dicklick",
  "dicklicker",
  "dickman",
  "dickwad",
  "dickweed",
  "diddle",
  "die",
  "died",
  "dies",
  "dike",
  "dildo",
  "dingleberry",
  "dink",
  "dipshit",
  "dipstick",
  "dirty",
  "disease",
  "diseases",
  "disturbed",
  "dive",
  "dix",
  "dixiedike",
  "dixiedyke",
  "doggiestyle",
  "doggystyle",
  "dong",
  "doodoo",
  "doo-doo",
  "doom",
  "dope",
  "dragqueen",
  "dragqween",
  "dripdick",
  "drug",
  "drunk",
  "drunken",
  "dumb",
  "dumbass",
  "dumbbitch",
  "dumbfuck",
  "dyefly",
  "dyke",
  "easyslut",
  "eatballs",
  "eatme",
  "eatpussy",
  "ecstacy",
  "ejaculate",
  "ejaculated",
  "ejaculating",
  "ejaculation",
  "enema",
  "enemy",
  "erect",
  "erection",
  "ero",
  "escort",
  "ethiopian",
  "ethnic",
  "european",
  "excrement",
  "execute",
  "executed",
  "execution",
  "executioner",
  "explosion",
  "facefucker",
  "faeces",
  "fagging",
  "faggot",
  "fagot",
  "failed",
  "failure",
  "fairies",
  "fairy",
  "faith",
  "fannyfucker",
  "fart",
  "farted",
  "farting",
  "farty",
  "fastfuck",
  "fat",
  "fatah",
  "fatass",
  "fatfuck",
  "fatfucker",
  "fatso",
  "fckcum",
  "fear",
  "feces",
  "felatio",
  "felch",
  "felcher",
  "felching",
  "fellatio",
  "feltch",
  "feltcher",
  "feltching",
  "fetish",
  "fight",
  "filipina",
  "filipino",
  "fingerfood",
  "fingerfuck",
  "fingerfucked",
  "fingerfucker",
  "fingerfuckers",
  "fingerfucking",
  "fire",
  "firing",
  "fister",
  "fistfuck",
  "fistfucked",
  "fistfucker",
  "fistfucking",
  "fisting",
  "flange",
  "flasher",
  "flatulence",
  "floo",
  "flydie",
  "flydye",
  "fok",
  "fondle",
  "footaction",
  "footfuck",
  "footfucker",
  "footlicker",
  "footstar",
  "fore",
  "foreskin",
  "forni",
  "fornicate",
  "foursome",
  "fourtwenty",
  "fraud",
  "freakfuck",
  "freakyfucker",
  "freefuck",
  "fubar",
  "fuc",
  "fucck",
  "fuck",
  "fucka",
  "fuckable",
  "fuckbag",
  "fuckbuddy",
  "fucked",
  "fuckedup",
  "fucker",
  "fuckers",
  "fuckface",
  "fuckfest",
  "fuckfreak",
  "fuckfriend",
  "fuckhead",
  "fuckher",
  "fuckin",
  "fuckina",
  "fucking",
  "fuckingbitch",
  "fuckinnuts",
  "fuckinright",
  "fuckit",
  "fuckknob",
  "fuckme",
  "fuckmehard",
  "fuckmonkey",
  "fuckoff",
  "fuckpig",
  "fucks",
  "fucktard",
  "fuckwhore",
  "fuckyou",
  "fudgepacker",
  "fugly",
  "fuk",
  "fuks",
  "funeral",
  "funfuck",
  "fungus",
  "fuuck",
  "gangbang",
  "gangbanged",
  "gangbanger",
  "gangsta",
  "gatorbait",
  "gay",
  "gaymuthafuckinwhore",
  "gaysex",
  "geez",
  "geezer",
  "geni",
  "genital",
  "german",
  "getiton",
  "gin",
  "ginzo",
  "gipp",
  "girls",
  "givehead",
  "glazeddonut",
  "gob",
  "god",
  "godammit",
  "goddamit",
  "goddammit",
  "goddamn",
  "goddamned",
  "goddamnes",
  "goddamnit",
  "goddamnmuthafucker",
  "goldenshower",
  "gonorrehea",
  "gonzagas",
  "gook",
  "gotohell",
  "goy",
  "goyim",
  "greaseball",
  "gringo",
  "groe",
  "gross",
  "grostulation",
  "gubba",
  "gummer",
  "gun",
  "gyp",
  "gypo",
  "gypp",
  "gyppie",
  "gyppo",
  "gyppy",
  "hamas",
  "handjob",
  "hapa",
  "harder",
  "hardon",
  "harem",
  "headfuck",
  "headlights",
  "hebe",
  "heeb",
  "hell",
  "henhouse",
  "heroin",
  "herpes",
  "heterosexual",
  "hijack",
  "hijacker",
  "hijacking",
  "hillbillies",
  "hindoo",
  "hiscock",
  "hitler",
  "hitlerism",
  "hitlerist",
  "hiv",
  "hobo",
  "hodgie",
  "hoes",
  "hole",
  "holestuffer",
  "homicide",
  "homo",
  "homobangers",
  "homosexual",
  "honger",
  "honk",
  "honkers",
  "honkey",
  "honky",
  "hook",
  "hooker",
  "hookers",
  "hooters",
  "hore",
  "hork",
  "horn",
  "horney",
  "horniest",
  "horny",
  "horseshit",
  "hosejob",
  "hoser",
  "hostage",
  "hotdamn",
  "hotpussy",
  "hottotrot",
  "hummer",
  "husky",
  "hussy",
  "hustler",
  "hymen",
  "hymie",
  "iblowu",
  "idiot",
  "ikey",
  "illegal",
  "incest",
  "insest",
  "intercourse",
  "interracial",
  "intheass",
  "inthebuff",
  "israel",
  "israeli",
  "israel's",
  "italiano",
  "itch",
  "jackass",
  "jackoff",
  "jackshit",
  "jacktheripper",
  "jade",
  "jap",
  "japcrap",
  "jebus",
  "jeez",
  "jerkoff",
  "jesuschrist",
  "jew",
  "jewish",
  "jiga",
  "jigaboo",
  "jigg",
  "jigga",
  "jiggabo",
  "jigger",
  "jiggy",
  "jihad",
  "jijjiboo",
  "jimfish",
  "jism",
  "jiz",
  "jizim",
  "jizjuice",
  "jizm",
  "jizz",
  "jizzim",
  "jizzum",
  "joint",
  "juggalo",
  "jugs",
  "junglebunny",
  "kaffer",
  "kaffir",
  "kaffre",
  "kafir",
  "kanake",
  "kid",
  "kigger",
  "kike",
  "kill",
  "killed",
  "killer",
  "killing",
  "kills",
  "kink",
  "kinky",
  "kissass",
  "kkk",
  "knife",
  "knockers",
  "kock",
  "kondum",
  "koon",
  "kotex",
  "krap",
  "krappy",
  "kraut",
  "kum",
  "kumbubble",
  "kumbullbe",
  "kummer",
  "kumming",
  "kumquat",
  "kums",
  "kunilingus",
  "kunnilingus",
  "kunt",
  "kyke",
  "lactate",
  "laid",
  "lapdance",
  "latin",
  "lesbain",
  "lesbayn",
  "lesbian",
  "lesbin",
  "lesbo",
  "lez",
  "lezbe",
  "lezbefriends",
  "lezbo",
  "lezz",
  "lezzo",
  "liberal",
  "libido",
  "licker",
  "lickme",
  "lies",
  "limey",
  "limpdick",
  "limy",
  "lingerie",
  "liquor",
  "livesex",
  "loadedgun",
  "lolita",
  "looser",
  "loser",
  "lotion",
  "lovebone",
  "lovegoo",
  "lovegun",
  "lovejuice",
  "lovemuscle",
  "lovepistol",
  "loverocket",
  "lowlife",
  "lsd",
  "lubejob",
  "lucifer",
  "luckycammeltoe",
  "lugan",
  "lynch",
  "macaca",
  "mad",
  "mafia",
  "magicwand",
  "mams",
  "manhater",
  "manpaste",
  "marijuana",
  "mastabate",
  "mastabater",
  "masterbate",
  "masterblaster",
  "mastrabator",
  "masturbate",
  "masturbating",
  "mattressprincess",
  "meatbeatter",
  "meatrack",
  "meth",
  "mexican",
  "mgger",
  "mggor",
  "mickeyfinn",
  "mideast",
  "milf",
  "minority",
  "mockey",
  "mockie",
  "mocky",
  "mofo",
  "moky",
  "moles",
  "molest",
  "molestation",
  "molester",
  "molestor",
  "moneyshot",
  "mooncricket",
  "mormon",
  "moron",
  "moslem",
  "mosshead",
  "mothafuck",
  "mothafucka",
  "mothafuckaz",
  "mothafucked",
  "mothafucker",
  "mothafuckin",
  "mothafucking",
  "mothafuckings",
  "motherfuck",
  "motherfucked",
  "motherfucker",
  "motherfuckin",
  "motherfucking",
  "motherfuckings",
  "motherlovebone",
  "muff",
  "muffdive",
  "muffdiver",
  "muffindiver",
  "mufflikcer",
  "mulatto",
  "muncher",
  "munt",
  "murder",
  "murderer",
  "muslim",
  "naked",
  "narcotic",
  "nasty",
  "nastybitch",
  "nastyho",
  "nastyslut",
  "nastywhore",
  "nazi",
  "necro",
  "negro",
  "negroes",
  "negroid",
  "negro's",
  "nig",
  "niger",
  "nigerian",
  "nigerians",
  "nigg",
  "nigga",
  "niggah",
  "niggaracci",
  "niggard",
  "niggarded",
  "niggarding",
  "niggardliness",
  "niggardliness's",
  "niggardly",
  "niggards",
  "niggard's",
  "niggaz",
  "nigger",
  "niggerhead",
  "niggerhole",
  "niggers",
  "nigger's",
  "niggle",
  "niggled",
  "niggles",
  "niggling",
  "nigglings",
  "niggor",
  "niggur",
  "niglet",
  "nignog",
  "nigr",
  "nigra",
  "nigre",
  "nip",
  "nipple",
  "nipplering",
  "nittit",
  "nlgger",
  "nlggor",
  "nofuckingway",
  "nook",
  "nookey",
  "nookie",
  "noonan",
  "nooner",
  "nude",
  "nudger",
  "nuke",
  "nutfucker",
  "nymph",
  "ontherag",
  "oral",
  "orga",
  "orgasim",
  "orgasm",
  "orgies",
  "orgy",
  "osama",
  "paki",
  "palesimian",
  "palestinian",
  "pansies",
  "pansy",
  "panti",
  "panties",
  "payo",
  "pearlnecklace",
  "peck",
  "pecker",
  "peckerwood",
  "peehole",
  "pee-pee",
  "peepshow",
  "peepshpw",
  "pendy",
  "penetration",
  "peni5",
  "penile",
  "penis",
  "penises",
  "penthouse",
  "period",
  "perv",
  "phonesex",
  "phuk",
  "phuked",
  "phuking",
  "phukked",
  "phukking",
  "phungky",
  "phuq",
  "pi55",
  "picaninny",
  "piccaninny",
  "pickaninny",
  "piker",
  "pikey",
  "piky",
  "pimp",
  "pimped",
  "pimper",
  "pimpjuic",
  "pimpjuice",
  "pimpsimp",
  "pindick",
  "piss",
  "pissed",
  "pisser",
  "pisses",
  "pisshead",
  "pissin",
  "pissing",
  "pissoff",
  "pistol",
  "pixie",
  "pixy",
  "playboy",
  "playgirl",
  "pocha",
  "pocho",
  "pocketpool",
  "pohm",
  "polack",
  "pom",
  "pommie",
  "pommy",
  "poo",
  "poon",
  "poontang",
  "poop",
  "pooper",
  "pooperscooper",
  "pooping",
  "poorwhitetrash",
  "popimp",
  "porchmonkey",
  "porn",
  "pornflick",
  "pornking",
  "porno",
  "pornography",
  "pornprincess",
  "pot",
  "poverty",
  "premature",
  "pric",
  "prick",
  "prickhead",
  "primetime",
  "propaganda",
  "pros",
  "prostitute",
  "protestant",
  "pu55i",
  "pu55y",
  "pube",
  "pubic",
  "pubiclice",
  "pud",
  "pudboy",
  "pudd",
  "puddboy",
  "puke",
  "puntang",
  "purinapricness",
  "puss",
  "pussie",
  "pussies",
  "pussy",
  "pussycat",
  "pussyeater",
  "pussyfucker",
  "pussylicker",
  "pussylips",
  "pussylover",
  "pussypounder",
  "pusy",
  "quashie",
  "queef",
  "queer",
  "quickie",
  "quim",
  "ra8s",
  "rabbi",
  "racial",
  "racist",
  "radical",
  "radicals",
  "raghead",
  "randy",
  "rape",
  "raped",
  "raper",
  "rapist",
  "rearend",
  "rearentry",
  "rectum",
  "redlight",
  "redneck",
  "reefer",
  "reestie",
  "refugee",
  "reject",
  "remains",
  "rentafuck",
  "republican",
  "rere",
  "retard",
  "retarded",
  "ribbed",
  "rigger",
  "rimjob",
  "rimming",
  "rizz",
  "roach",
  "robber",
  "roundeye",
  "rump",
  "russki",
  "russkie",
  "sadis",
  "sadom",
  "samckdaddy",
  "sandm",
  "sandnigger",
  "satan",
  "scag",
  "scallywag",
  "scat",
  "schlong",
  "screw",
  "screwyou",
  "scrotum",
  "scum",
  "semen",
  "seppo",
  "servant",
  "sex",
  "sexed",
  "sexfarm",
  "sexhound",
  "sexhouse",
  "sexing",
  "sexkitten",
  "sexpot",
  "sexslave",
  "sextogo",
  "sextoy",
  "sextoys",
  "sexual",
  "sexually",
  "sexwhore",
  "sexy",
  "sexymoma",
  "sexy-slim",
  "shag",
  "shaggin",
  "shagging",
  "shat",
  "shav",
  "shawtypimp",
  "sheeney",
  "shhit",
  "shinola",
  "shit",
  "shitcan",
  "shitdick",
  "shite",
  "shiteater",
  "shited",
  "shitface",
  "shitfaced",
  "shitfit",
  "shitforbrains",
  "shitfuck",
  "shitfucker",
  "shitfull",
  "shithapens",
  "shithappens",
  "shithead",
  "shithouse",
  "shiting",
  "shitlist",
  "shitola",
  "shitoutofluck",
  "shits",
  "shitstain",
  "shitted",
  "shitter",
  "shitting",
  "shitty",
  "shoot",
  "shooting",
  "shortfuck",
  "showtime",
  "sick",
  "sigma",
  "sissy",
  "sixsixsix",
  "sixtynine",
  "sixtyniner",
  "skank",
  "skankbitch",
  "skankfuck",
  "skankwhore",
  "skanky",
  "skibidi",
  "skankybitch",
  "skankywhore",
  "skinflute",
  "skum",
  "skumbag",
  "slant",
  "slanteye",
  "slapper",
  "slaughter",
  "slav",
  "slave",
  "slavedriver",
  "sleezebag",
  "sleezebag",
  "sleezeball",
  "slideitin",
  "slime",
  "slimeball",
  "slimebucket",
  "slopehead",
  "slopey",
  "slopy",
  "slut",
  "sluts",
  "slutt",
  "slutting",
  "slutty",
  "slutwear",
  "slutwhore",
  "smack",
  "smackthemonkey",
  "smut",
  "snatch",
  "snatchpatch",
  "snigger",
  "sniggered",
  "sniggering",
  "sniggers",
  "snigger's",
  "sniper",
  "snot",
  "snowback",
  "snownigger",
  "sob",
  "sodom",
  "sodomise",
  "sodomite",
  "sodomize",
  "sodomy",
  "sonofabitch",
  "sonofbitch",
  "sooty",
  "sos",
  "soviet",
  "spaghettibender",
  "spaghettinigger",
  "spank",
  "spankthemonkey",
  "sperm",
  "spermacide",
  "spermbag",
  "spermhearder",
  "spermherder",
  "spic",
  "spick",
  "spig",
  "spigotty",
  "spik",
  "spit",
  "spitter",
  "splittail",
  "spooge",
  "spreadeagle",
  "spunk",
  "spunky",
  "squaw",
  "stagg",
  "stiffy",
  "strapon",
  "stringer",
  "stripclub",
  "stroke",
  "stroking",
  "stupid",
  "stupidfuck",
  "stupidfucker",
  "suck",
  "suckdick",
  "sucker",
  "suckme",
  "suckmyass",
  "suckmydick",
  "suckmytit",
  "suckoff",
  "suicide",
  "swallow",
  "swallower",
  "swalow",
  "swastika",
  "sweetness",
  "syphilis",
  "taboo",
  "taff",
  "tampon",
  "tang",
  "tantra",
  "tarbaby",
  "tard",
  "teat",
  "terror",
  "terrorist",
  "teste",
  "testicle",
  "testicles",
  "thicklips",
  "thirdeye",
  "thirdleg",
  "threesome",
  "threeway",
  "timbernigger",
  "tinkle",
  "tit",
  "titbitnipply",
  "titfuck",
  "titfucker",
  "titfuckin",
  "titjob",
  "titlicker",
  "titlover",
  "tits",
  "tittie",
  "titties",
  "titty",
  "tnt",
  "toilet",
  "tongethruster",
  "tongue",
  "tonguethrust",
  "tonguetramp",
  "tortur",
  "torture",
  "tosser",
  "towelhead",
  "trailertrash",
  "tramp",
  "trannie",
  "tranny",
  "transexual",
  "transsexual",
  "transvestite",
  "triplex",
  "trisexual",
  "trojan",
  "trots",
  "tuckahoe",
  "tunneloflove",
  "turd",
  "turnon",
  "twat",
  "twink",
  "twinkie",
  "twobitwhore",
  "unfuckable",
  "upskirt",
  "uptheass",
  "upthebutt",
  "urinary",
  "urinate",
  "urine",
  "usama",
  "uterus",
  "vagina",
  "vaginal",
  "vatican",
  "vibr",
  "vibrater",
  "vibrator",
  "vietcong",
  "violence",
  "virgin",
  "virginbreaker",
  "vomit",
  "vulva",
  "wank",
  "wanker",
  "wanking",
  "waysted",
  "weapon",
  "weenie",
  "weewee",
  "welcher",
  "welfare",
  "wetb",
  "wetback",
  "wetspot",
  "whacker",
  "whash",
  "whigger",
  "whiskey",
  "whiskeydick",
  "whiskydick",
  "whit",
  "whitenigger",
  "whites",
  "whitetrash",
  "whitey",
  "whiz",
  "whop",
  "whore",
  "whorefucker",
  "whorehouse",
  "wigger",
  "willie",
  "williewanker",
  "willy",
  "wuss",
  "wuzzie",
  "xtc",
  "xxx",
  "yankee",
  "yellowman",
  "zigabo",
  "zipperhead",
];

export default zabranjeneReci;
