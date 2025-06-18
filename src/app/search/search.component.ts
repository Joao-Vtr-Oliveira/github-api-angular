import { Component, input, model, output } from '@angular/core';
import { UserType } from '../user/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  user = input<UserType | undefined>();
  inputEvent = output<string>();

  userName = model('Peagah-vieira');

  onEvent() {
    this.inputEvent.emit(this.userName());
  }

}
