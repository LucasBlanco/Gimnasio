import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cuilFormat' })
export class CuilPipe implements PipeTransform {

    transform(cuil: string): string {
        if (cuil != null) {
            return cuil.slice(0, 2) + '-' + cuil.slice(2, 10) + '-' + cuil.slice(10, 11)
        }
    }
}