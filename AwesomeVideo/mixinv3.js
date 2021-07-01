export const v3load = {
    beforeUnmount(){
        clearInterval(this.interval);
        this.interval = null;
    }
}
export const v3index = {
    beforeUnmount(){
        window.removeEventListener("fullscreenchange", this.full, true);
        window.removeEventListener("keydown", this.keydown, true);
    }
}