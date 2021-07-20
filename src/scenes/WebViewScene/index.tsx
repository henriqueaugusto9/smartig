import { RouteComponentProps, useLocation } from "react-router-dom";





interface WebViewSceneRouteParams {
    url: string
}


export const WebViewScene: React.FC<RouteComponentProps<WebViewSceneRouteParams>> = () => {
    let { state } = useLocation<WebViewSceneRouteParams>();
    return <iframe
        src={state.url}
        style={{ width: '100%', height: '100%', overflowY: 'hidden' }}
    />

}




