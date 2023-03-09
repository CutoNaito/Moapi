use yew::{function_component, html, Html};

#[function_component(Footer)]
pub fn footer() -> Html {
    html! {
        <footer>
            <p>{ "Hello, world!" }</p>
        </footer>
    }
}