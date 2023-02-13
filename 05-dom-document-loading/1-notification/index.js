export default class NotificationMessage {
  static notificationElement = false;

  constructor(message = "", { duration = 1000, type = "success" } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render();
  }

  getNotification() {
    return `
      <div class="notification ${this.type}" style="--value:${this.duration}ms">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>`;
  }

  render() {
    const element = document.createElement("div");
    element.innerHTML = this.getNotification();
    this.element = element.firstElementChild;
  }

  show(body = document.body) {
    if (NotificationMessage.notificationElement) {
      NotificationMessage.notificationElement.remove();
    }
    NotificationMessage.notificationElement = this.element;
    body.append(this.element);

    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.element.remove();
  }
}
