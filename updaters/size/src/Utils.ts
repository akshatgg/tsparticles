import { AnimationStatus, DestroyType, type IDelta, type Particle, clamp } from "@tsparticles/engine";

/**
 * @param particle -
 * @param value -
 * @param minValue -
 * @param maxValue -
 */
function checkDestroy(particle: Particle, value: number, minValue: number, maxValue: number): void {
    switch (particle.options.size.animation.destroy) {
        case DestroyType.max:
            if (value >= maxValue) {
                particle.destroy();
            }
            break;
        case DestroyType.min:
            if (value <= minValue) {
                particle.destroy();
            }
            break;
    }
}

/**
 * @param particle -
 * @param delta -
 */
export function updateSize(particle: Particle, delta: IDelta): void {
    const data = particle.size;

    if (
        particle.destroyed ||
        !data ||
        !data.enable ||
        ((data.maxLoops ?? 0) > 0 && (data.loops ?? 0) > (data.maxLoops ?? 0))
    ) {
        return;
    }

    const sizeVelocity = (data.velocity ?? 0) * delta.factor,
        minValue = data.min,
        maxValue = data.max,
        decay = data.decay ?? 1;

    if (!data.time) {
        data.time = 0;
    }

    if ((data.delayTime ?? 0) > 0 && data.time < (data.delayTime ?? 0)) {
        data.time += delta.value;
    }

    if ((data.delayTime ?? 0) > 0 && data.time < (data.delayTime ?? 0)) {
        return;
    }

    switch (data.status) {
        case AnimationStatus.increasing:
            if (data.value >= maxValue) {
                data.status = AnimationStatus.decreasing;

                if (!data.loops) {
                    data.loops = 0;
                }

                data.loops++;
            } else {
                data.value += sizeVelocity;
            }

            break;
        case AnimationStatus.decreasing:
            if (data.value <= minValue) {
                data.status = AnimationStatus.increasing;

                if (!data.loops) {
                    data.loops = 0;
                }

                data.loops++;
            } else {
                data.value -= sizeVelocity;
            }
    }

    if (data.velocity && decay !== 1) {
        data.velocity *= decay;
    }

    checkDestroy(particle, data.value, minValue, maxValue);

    if (!particle.destroyed) {
        data.value = clamp(data.value, minValue, maxValue);
    }
}
