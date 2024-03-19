import { FormGroup, FormControl} from "@angular/forms"

export const confirmPasswordValidator = (controlName: string, controlNameToMatch : string)=>{
    return (formGroup: FormGroup)=>{
        let control = formGroup.controls[controlName];
        let controlToMatch = formGroup.controls[controlNameToMatch];
        if (controlToMatch.errors && !controlToMatch.errors['confirmPasswordValidator']){
            return;
        }
        if(control.value === controlToMatch.value){
            controlToMatch.setErrors(null);
        }else {
            controlToMatch.setErrors({ confirmPasswordValidator : true });
        }
    }
}
