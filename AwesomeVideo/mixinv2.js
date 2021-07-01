export const v2load = {
    beforeDestory(){
        clearInterval(this.interval);
        this.interval = null;
    }
}
export const v2index = {
    beforeDestory(){
        window.removeEventListener("fullscreenchange", this.full, true);
        window.removeEventListener("keydown", this.keydown, true);
    }
}