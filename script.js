'use strict';

const DomElement = function(selector, height, width, bg, fontSize, position) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.position = position;
};

DomElement.prototype.create = function() {
    if (this.selector[0] === '.') {
        const newDiv = document.createElement('div');
        newDiv.classList.add(this.selector.split('').splice(1).join(''));
        newDiv.style.cssText = `
                                height: ${this.height};
                                width: ${this.width};
                                background: ${this.bg};
                                font-size: ${this.fontSize};
                                position: ${this.position};
        `;
        this.element = newDiv;
        document.body.append(newDiv);
    }

    if (this.selector[0] === '#') {
        const newPar = document.createElement('p');
        newPar.id = (this.selector.split('').splice(1).join(''));
        newPar.style.cssText = `
                                height: ${this.height};
                                width: ${this.width};
                                background: ${this.bg};
                                font-size: ${this.fontSize};
                                position: ${this.position};
        `;
        this.element = newPar;
        document.body.append(newPar);
    }
};

DomElement.prototype.addText = function(text) {
    if (this.element) {
        this.element.textContent = text;
    }
};

const square = new DomElement('.square', '100px', '100px', 'blue', '', 'absolute');

square.move = function(event) {
    if (event.code === 'ArrowLeft') {
        if (!this.element.style.right) {
            if (this.element.style.left) {
                const position = parseInt(this.element.style.left);
                this.element.style.left = '';

                if (position > 0) {
                    this.element.style.right = -position + 10 + 'px';
                } else {
                    this.element.style.right = Math.abs(position) + 10 + 'px';
                }
            } else {
                this.element.style.right = '10px';
            }

            return;
        }
        
        if (this.element.style.right) {
            const position = parseInt(this.element.style.right);

            if (position > 0) {
                this.element.style.right = position + 10 + 'px';
            } else {
                this.element.style.right = position + 10 + 'px';
            }
        }
    }

    if (event.code === 'ArrowRight') {
        if (!this.element.style.left) {
            if (this.element.style.right) {
                const position = parseInt(this.element.style.right);
                this.element.style.right = '';

                if (position > 0) {
                    this.element.style.left = -position + 10 + 'px';
                } else {
                    this.element.style.left = Math.abs(position) + 10 + 'px';
                }
            } else {
                this.element.style.left = '10px';
            }

            return;
        }
        
        if (this.element.style.left) {
            const position = parseInt(this.element.style.left);

            if (position > 0) {
                this.element.style.left = position + 10 + 'px';
            } else {
                this.element.style.left = position + 10 + 'px';
            }
        }
    }

    if (event.code === 'ArrowUp') {
        if (!this.element.style.bottom) {
            if (this.element.style.top) {
                const position = parseInt(this.element.style.top);
                this.element.style.top = '';

                if (position > 0) {
                    this.element.style.bottom = -position + 10 + 'px';
                } else {
                    this.element.style.bottom = Math.abs(position) + 10 + 'px';
                }
            } else {
                this.element.style.bottom = '10px';
            }

            return;
        }
        
        if (this.element.style.bottom) {
            const position = parseInt(this.element.style.bottom);

            if (position > 0) {
                this.element.style.bottom = position + 10 + 'px';
            } else {
                this.element.style.bottom = position + 10 + 'px';
            }
        }
    }

    if (event.code === 'ArrowDown') {
        if (!this.element.style.top) {
            if (this.element.style.bottom) {
                const position = parseInt(this.element.style.bottom);
                this.element.style.bottom = '';

                if (position > 0) {
                    this.element.style.top = -position + 10 + 'px';
                } else {
                    this.element.style.top = Math.abs(position) + 10 + 'px';
                }
            } else {
                this.element.style.top = '10px';
            }

            return;
        }
        
        if (this.element.style.top) {
            const position = parseInt(this.element.style.top);

            if (position > 0) {
                this.element.style.top = position + 10 + 'px';
            } else {
                this.element.style.top = position + 10 + 'px';
            }
        }
    }
};

square.eventListeners = function() {
    const _this = this;
    document.body.addEventListener('keydown', this.move.bind(_this));
};

document.addEventListener('DOMContentLoaded', function() {
    const testDiv = new DomElement('.block', '100px', '50%', 'red', '25px');
    testDiv.create();
    testDiv.addText('Тестовый див');

    const testPar = new DomElement('#block', '100px', '50%', 'green', '25px');
    testPar.create();
    testPar.addText('Тестовый абзац');
    
    square.create();
    square.eventListeners();
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'margin: 200px auto; position: relative; height: 100px; width: 100px;';
    document.body.append(wrapper);
    wrapper.append(square.element);
});
