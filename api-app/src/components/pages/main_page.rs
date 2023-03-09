use yew::{function_component, html, Html};
use crate::components::header::Header;
use crate::components::footer::Footer;

#[function_component(SideMenu)]
pub fn side_menu() -> Html {
    html! {
        <div class="side-menu">
            <p>{"There is nothing yet, WIP"}</p>
        </div>
    }
}

#[function_component(MainPage)]
pub fn main_page() -> Html {
    html! {
        <div>
            <Header />
            <main>
                <div class="container">
                    <SideMenu />
                </div>
            </main>
            <Footer />
        </div>
    }
}