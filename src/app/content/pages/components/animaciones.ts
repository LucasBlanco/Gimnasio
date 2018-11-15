import {
    animation, trigger, animateChild, group,
    transition, animate, style, query, useAnimation
} from '@angular/animations';

const timeIn = '0.2s ease-in'
const slowTimeIn = '0.5s ease-in'

const timeOut = '0.2s ease-out'
const slowTimeOut = '0.5s ease-out'

const transAnimationIn = animation([
    style({ opacity: 0, transform: '{{ transform1 }}' }), 
    animate('{{ time }}', style({ opacity: 1, transform: '{{transform2}}' }))
]);

const transAnimationOut = animation([
    animate('{{ time }}', style({ opacity: 0, transform: '{{transform}}' }))
]);

const fadeAnimationIn = animation([
    style({ opacity: 0}),
    animate('{{ time }}', style({ opacity: 1}))
]);

const fadeAnimationOut = animation([
    animate('{{ time }}', style({ opacity: 0 }))
]);

// Enter Right

export const enterRightShort = animation([
    useAnimation(transAnimationIn, { params: { transform1: 'translateX(5%)', transform2: 'translateX(0%)', time: timeIn }})
]);

export const enterRightSlowerShort = animation([
    useAnimation(transAnimationIn, { params: { transform1: 'translateX(5%)', transform2: 'translateX(0%)', time: slowTimeIn } })
]);

export const enterRight = animation([
    useAnimation(transAnimationIn, { params: { transform1: 'translateX(100%)', transform2: 'translateX(0%)', time: timeIn } })
]);

export const enterRightSlower = animation([
    useAnimation(transAnimationIn, { params: { transform1: 'translateX(100%)', transform2: 'translateX(0%)', time: slowTimeIn } })
]);

// Exit Right

export const exitRightShort = animation([
    useAnimation(transAnimationOut, { params: { transform: 'translateX(5%)', time: timeOut } })
]);

export const exitRightSlowerShort = animation([
    useAnimation(transAnimationOut, { params: { transform: 'translateX(5%)',  time: slowTimeOut } })
]);

export const exitRight = animation([
    useAnimation(transAnimationOut, { params: { transform: 'translateX(100%)',  time: timeOut } })
]);

export const exitRightSlower = animation([
    useAnimation(transAnimationOut, { params: { transform: 'translateX(100%)',  time: slowTimeOut } })
]);

// Enter up

export const enterUpShort = animation([
    useAnimation(transAnimationIn, { params: { transform1: 'translateY(-5%)', transform2: 'translateY(0%)', time: timeIn } })
]);

export const enterUpSlowerShort = animation([
    useAnimation(transAnimationIn, { params: { transform1: 'translateY(-5%)', transform2: 'translateY(0%)', time: slowTimeIn } })
]);

export const enterUp = animation([
    useAnimation(transAnimationIn, { params: { transform1: 'translateY(-100%)', transform2: 'translateY(0%)', time: timeIn } })
]);

export const enterUpSlower = animation([
    useAnimation(transAnimationIn, { params: { transform1: 'translateY(-100%)', transform2: 'translateY(0%)', time: slowTimeIn } })
]);

// Exit Right

export const exitUpShort = animation([
    useAnimation(transAnimationOut, { params: { transform: 'translateY(-5%)', time: timeOut } })
]);

export const exitUpSlowerShort = animation([
    useAnimation(transAnimationOut, { params: { transform: 'translateY(-5%)', time: slowTimeOut } })
]);

export const exitUp = animation([
    useAnimation(transAnimationOut, { params: { transform: 'translateY(-100%)', time: timeOut } })
]);

export const exitUpSlower = animation([
    useAnimation(transAnimationOut, { params: { transform: 'translateY(-100%)', time: slowTimeOut } })

]);

// Fade in

export const fadeIn = animation([
    useAnimation(fadeAnimationIn, { params: { time: timeIn }})
]);

export const fadeInSlow = animation([
    useAnimation(fadeAnimationIn, { params: { time: slowTimeIn } })
]);

// Fade out

export const fadeOut = animation([
    useAnimation(fadeAnimationOut, { params: { time: timeOut } })
]);

export const fadeOutSlower = animation([
    useAnimation(fadeAnimationOut, { params: { time: slowTimeOut} })
]);



