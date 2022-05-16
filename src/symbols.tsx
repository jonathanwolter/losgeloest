function Add({className}: any) {
    return <svg xmlns="http://www.w3.org/2000/svg" className={"addSymbol " + className} fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
}

function Subtract({className}: any) {
    return <svg xmlns="http://www.w3.org/2000/svg" className={"subtractSymbol " + className} fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
}

function DotsVertical({className}: any) {
    return <svg xmlns="http://www.w3.org/2000/svg" className={"dotsVerticalSymbol " + className} fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
    </svg>
}

function Plus({className}: any) {
    return <svg xmlns="http://www.w3.org/2000/svg" className={"plusSymbol " + className} fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
    </svg>
}

export {Add, Subtract, DotsVertical, Plus}