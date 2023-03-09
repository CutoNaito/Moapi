use yew::{function_component, html, Html};

#[function_component(Header)]
pub fn header() -> Html {
    html! {
        <header>
            <h1>{ "Hello, world!" }</h1>
        </header>
    }
}