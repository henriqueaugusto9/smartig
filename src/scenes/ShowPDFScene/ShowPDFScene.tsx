import { RouteComponentProps, useLocation } from "react-router-dom";





interface ShowPDFSceneRouteParams {
    pdfUrl: string
}


export const ShowPDFScene: React.FC<RouteComponentProps<ShowPDFSceneRouteParams>> = () => {
    let { state } = useLocation<ShowPDFSceneRouteParams>();
    console.log(state)
    return <iframe
        src={state.pdfUrl}
        style={{ width: '100%', height: '100%', overflowY: 'hidden' }}
    />

}




