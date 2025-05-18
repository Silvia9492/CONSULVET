import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, base64ToFile, LoadedImage } from 'ngx-image-cropper';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-animalPhotoDialog',
  templateUrl: './animalPhotoDialog.component.html',
  styleUrls: ['./animalPhotoDialog.component.css']
})
export class AnimalPhotoDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AnimalPhotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  imageChangedEvent: any = '';
  croppedImage: string = '';
  croppedFile: File | null = null;
  
  //Umbral para aplicar compresión a la imagen subida por el usuario
  maxFileSizeMB = 10;
  
  isLoading = false;
  errorMessage = '';

  photoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    
    const file = input.files[0];
    
    //Feedback al usuario: si la foto es demasiado grande, se le informa de que ésta va a ser comprimida.
    const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > this.maxFileSizeMB) {
        this.snackBar.open(`La foto que has seleccionado pesa (${fileSizeMB.toFixed(2)} MB). Se comprimirá automáticamente.`, 'Entendido', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    
      this.errorMessage = '';
      this.imageChangedEvent = event;
  }
  
  imageLoaded(loadedImage: LoadedImage): void {
    this.isLoading = false;
  }
  
  loadImageFailed(): void {
    this.errorMessage = 'No se ha podido cargar tu foto. Por favor, inténtalo de nuevo o prueba con una diferente.';
    this.snackBar.open(this.errorMessage, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
    this.isLoading = false;
  }

  /*Croppeado de la imagen.
    -Si la seleccionada por el usuario es demasiado grande, ésta se redimensiona
      y se configura a un tamaño más pequeño para que no dé problemas de tamaño en la subida
    -Solución más flexible y amigable para el usuario, en lugar de limitar el tamaño de subida de imágenes
      como se hace en otras webs
  */
  imageCropped(event: ImageCroppedEvent) {
    if (!event.base64) return;
    
    this.isLoading = true;

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');
      let width = image.width;
      let height = image.height;
      
      const targetSize = 800; //Objetivo de tamaño máximo
      if (width > targetSize || height > targetSize) {
        const ratio = Math.min(targetSize / width, targetSize / height);
        width = Math.floor(width * ratio);
        height = Math.floor(height * ratio);
      }
      
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      if (!context) {
        this.snackBar.open('Se ha producido un error durante el procesado de la imagen', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.isLoading = false;
        return;
      }
      
      context.drawImage(image, 0, 0, width, height);

      this.compressImageToTargetSize(canvas, width, height, 0.9, 1);
    };
    
    image.onerror = () => {
      this.snackBar.open('Se ha producido un error durante el procesado de la imagen', 'Cerrar', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      this.isLoading = false;
    };
    
    image.src = event.base64;
  }
  
  //Compresión iterativa hasta lograr el tamaño de imagen deseado
  private compressImageToTargetSize(canvas: HTMLCanvasElement, width: number, height: number, initialQuality: number, attempt: number): void {
    const targetSizeMB = 1; //Objetivo de tamaño a conseguir (en MB)
    const minQuality = 0.3; //Calidad mínima aceptable
    const maxAttempts = 5; //Máximo número de intentos de compresión permitidos
    
    //Vamos ajustando la calidad
    let quality = Math.max(minQuality, initialQuality - ((attempt - 1) * 0.15));
    
    //Comprimimos la imagen con la calidad ya calculada
    const compressedBase64 = canvas.toDataURL('image/jpeg', quality);

    /*Usamos la función "base64ToFile()" para convertir ese base64 en un objeto de tipo blob (objeto binario) que se puede descargar, subir a un servidor
    mostrar como imagen (si el archivo es una imagen) y adjuntar a un formulario FormData.*/
    const blob = base64ToFile(compressedBase64);
    const file = new File([blob], 'animal_foto.jpg', {
      type: 'image/jpeg',
      lastModified: Date.now()
    });
    
    const fileSizeMB = file.size / (1024 * 1024);
    
    /*Verificamos si se han agotado los intentos o si el tamaño estipulado se ha conseguido; si no se ha conseguido, aunque el número de intentos se haya agotado,
    se vuelve a redimensionar el canvas y se vuelve a intentar*/
    if (fileSizeMB <= targetSizeMB || attempt >= maxAttempts || quality <= minQuality) {
      if (fileSizeMB > this.maxFileSizeMB && width > 400 && height > 400) {
        const newWidth = Math.floor(width * 0.7);
        const newHeight = Math.floor(height * 0.7);
        
        const newCanvas = document.createElement('canvas');
        newCanvas.width = newWidth;
        newCanvas.height = newHeight;
        const newContext = newCanvas.getContext('2d');
        
        if (newContext) {
          newContext.drawImage(canvas, 0, 0, newWidth, newHeight);
          this.compressImageToTargetSize(newCanvas, newWidth, newHeight, 0.9, 1);
          return;
        }
      }
      
      //Después de comprimir, guardamos el resultado final y se le informa al usuario
      this.croppedImage = compressedBase64;
      this.croppedFile = file;

      if (attempt > 1 || quality < 0.9) {
        this.snackBar.open(`Imagen comprimida correctamente a (${fileSizeMB.toFixed(2)} MB)`, '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
      this.isLoading = false;
    } else {
      //En caso de no haber logrado obtener el tamaño deseado, se vuelve a intentar pero bajando la calidad
      setTimeout(() => {
        this.compressImageToTargetSize(canvas, width, height, initialQuality, attempt + 1);
      }, 0);
    }
  }

  confirmPhoto(): void {
    if (this.isLoading) {
      this.snackBar.open('Su foto se está procesando; por favor, espera', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }
    
    //Hacemos una verificación más del tamaño de la imagen, por si acaso; si sigue excediendo el tamaño, se vuelve a procesar
    if (this.croppedFile && this.croppedImage) {
      const fileSizeMB = this.croppedFile.size / (1024 * 1024);
      if (fileSizeMB > 2) {
        this.snackBar.open('Su foto aún es demasiado grande. Vamos a procesarla de nuevo', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement('canvas');
          //La reducimos a, máximo, 600 píxeles, tanto a lo ancho como a lo alto
          const maxDim = 600;
          let width = image.width;
          let height = image.height;
          
          if (width > maxDim || height > maxDim) {
            const ratio = Math.min(maxDim / width, maxDim / height);
            width = Math.floor(width * ratio);
            height = Math.floor(height * ratio);
          }
          
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext('2d');
          if (context) {
            context.drawImage(image, 0, 0, width, height);
            //Compresión en baja calidad para asegurarnos de que el tamaño resultante sea pequeño, y válido
            const finalBase64 = canvas.toDataURL('image/jpeg', 0.5);
            this.croppedImage = finalBase64;
            
            const blob = base64ToFile(finalBase64);
            this.croppedFile = new File([blob], 'animal_foto.jpg', {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            
            //Por último, se envía la foto
            this.dialogRef.close({
              file: this.croppedFile,
              preview: this.croppedImage
            });
          }
        };
        
        image.src = this.croppedImage;
        return;
      }
      
      //Si el tamaño de la foto es válido, ésta es enviada; en caso contrario, se le pide al usuario que seleccione otra foto
      this.dialogRef.close({
        file: this.croppedFile,
        preview: this.croppedImage
      });
    } else {
      this.snackBar.open('Debes seleccionar una foto para continuar', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
  }

  cancelPhoto(): void {
    this.dialogRef.close();
  }
}