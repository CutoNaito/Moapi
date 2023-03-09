use yew::{function_component, html, Html};
use crate::components::header::Header;
use crate::components::footer::Footer;

#[function_component(MainPage)]
pub fn main_page() -> Html {
    html! {
        <div>
            <Header />
            <main>
                <div class="container">
                    
                </div>
            </main>
            <Footer />
        </div>
    }
}