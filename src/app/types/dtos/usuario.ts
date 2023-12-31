import { formatDate } from "@angular/common";

export class Usuario {
    [key: string]: any;

    public id: number;
    public email: string;
    public nick: string;
    public name: string;
    public lastName: string;

    constructor() {
        this.id = 0;
        this.email = '';
        this.nick = '';
        this.name = '';
        this.lastName = '';
    }

    public set(property: string, value: any): Usuario {
        if (this.hasOwnProperty(property)) {
            try {
                let type = typeof this[property];
                let typedValue = <typeof type>value;
                this[property] = typedValue;
                return this;
            }
            catch (error) {
                throw new Error(`Error setting property ${property} with value ${value}.`);
            }
        }
        else {
            throw new Error(`Property ${property} does not exist.`);
        }
    }

    static fromJson(json: any): Usuario {
        let result = new Usuario();
        for (let key in json) {
            if (json.hasOwnProperty(key)) {
                result.set(key, json[key]);
            }
        }
        return result;
    }
    
    public toJson(): any {
        let result: any = {};
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                result[key] = this[key];
            }
        }
        return result;
    }

    public clone(): Usuario {
        return Usuario.fromJson(this.toJson());
    }
}
