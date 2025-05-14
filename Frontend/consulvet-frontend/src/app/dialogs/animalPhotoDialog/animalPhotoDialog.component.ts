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

  imageChangedEvent: any = '';
  croppedImage: string = '';
  croppedFile: File | null = null;
  
  // Configuración de límites (solo para información interna)
  maxFileSizeMB = 10; // Umbral para aplicar compresión más agresiva
  
  // Control de estado
  isLoading = false;
  errorMessage = '';
  
  // Flags de procesamiento
  private isProcessingImage = false; // Evitar múltiples procesamientos simultáneos

  constructor(
    public dialogRef: MatDialogRef<AnimalPhotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  photoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    
    const file = input.files[0];
    
    // Informar al usuario si el archivo es grande pero permitirlo de todos modos
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > this.maxFileSizeMB) {
      this.snackBar.open(`La imagen es grande (${fileSizeMB.toFixed(2)} MB). Se comprimirá automáticamente.`, 'Entendido', {
        duration: 4000
      });
    }
    
    this.errorMessage = '';
    this.imageChangedEvent = event;
  }
  
  imageLoaded(loadedImage: LoadedImage): void {
    // Podemos usar este método para verificaciones adicionales
    // cuando la imagen se carga en el cropper
    this.isLoading = false;
  }
  
  loadImageFailed(): void {
    this.errorMessage = 'No se pudo cargar la imagen. Por favor, intenta con otro archivo.';
    this.snackBar.open(this.errorMessage, 'Cerrar', {
      duration: 5000
    });
    this.isLoading = false;
  }

  imageCropped(event: ImageCroppedEvent) {
    if (!event.base64) return;
    
    this.isLoading = true;
    
    // Crear una imagen para obtener dimensiones y comprimir
    const img = new Image();
    img.onload = () => {
      // Primer paso: Redimensionar si es demasiado grande
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      // Redimensionar imágenes grandes, sin importar qué tan grandes sean
      const targetSize = 800; // Tamaño máximo objetivo
      if (width > targetSize || height > targetSize) {
        const ratio = Math.min(targetSize / width, targetSize / height);
        width = Math.floor(width * ratio);
        height = Math.floor(height * ratio);
      }
      
      // Configurar canvas y dibujar imagen redimensionada
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        this.snackBar.open('Error al procesar la imagen', 'Cerrar', { duration: 3000 });
        this.isLoading = false;
        return;
      }
      
      ctx.drawImage(img, 0, 0, width, height);
      
      // Segundo paso: Comprimir iterativamente hasta lograr un tamaño adecuado
      this.compressImageToTargetSize(canvas, width, height, 0.9, 1); // Comenzar con calidad alta
    };
    
    img.onerror = () => {
      this.snackBar.open('Error al procesar la imagen', 'Cerrar', { duration: 3000 });
      this.isLoading = false;
    };
    
    img.src = event.base64;
  }
  
  // Método para comprimir iterativamente hasta lograr el tamaño deseado
  private compressImageToTargetSize(canvas: HTMLCanvasElement, width: number, height: number, initialQuality: number, attempt: number): void {
    const targetSizeMB = 1; // Tamaño objetivo en MB
    const minQuality = 0.3; // Calidad mínima aceptable
    const maxAttempts = 5; // Máximo número de intentos de compresión
    
    // Ajustar calidad según el intento
    let quality = Math.max(minQuality, initialQuality - ((attempt - 1) * 0.15));
    
    // Comprimir con la calidad calculada
    const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
    
    // Convertir a blob para verificar tamaño
    const blob = base64ToFile(compressedBase64);
    const file = new File([blob], 'animal_foto.jpg', {
      type: 'image/jpeg',
      lastModified: Date.now()
    });
    
    const fileSizeMB = file.size / (1024 * 1024);
    
    // Verificar si hemos alcanzado el tamaño objetivo o el límite de intentos
    if (fileSizeMB <= targetSizeMB || attempt >= maxAttempts || quality <= minQuality) {
      // Si aún así es muy grande después de todos los intentos, redimensionar el canvas
      if (fileSizeMB > this.maxFileSizeMB && width > 400 && height > 400) {
        // Reducir tamaño a la mitad y reintentar
        const newWidth = Math.floor(width * 0.7);
        const newHeight = Math.floor(height * 0.7);
        
        const newCanvas = document.createElement('canvas');
        newCanvas.width = newWidth;
        newCanvas.height = newHeight;
        const newCtx = newCanvas.getContext('2d');
        
        if (newCtx) {
          newCtx.drawImage(canvas, 0, 0, newWidth, newHeight);
          this.compressImageToTargetSize(newCanvas, newWidth, newHeight, 0.9, 1);
          return;
        }
      }
      
      // Guardar resultado final después de compresión
      this.croppedImage = compressedBase64;
      this.croppedFile = file;
      
      // Informar al usuario del resultado
      if (attempt > 1 || quality < 0.9) {
        this.snackBar.open(`Imagen comprimida correctamente (${fileSizeMB.toFixed(2)} MB)`, 'Entendido', { 
          duration: 3000 
        });
      }
      
      this.isLoading = false;
    } else {
      // Si aún no alcanzamos el tamaño objetivo, intentar con menor calidad
      setTimeout(() => {
        this.compressImageToTargetSize(canvas, width, height, initialQuality, attempt + 1);
      }, 0);
    }
  }

  confirmPhoto(): void {
    if (this.isLoading) {
      this.snackBar.open('Por favor espera mientras la imagen se está procesando', 'Entendido', {
        duration: 3000
      });
      return;
    }
    
    if (this.croppedFile && this.croppedImage) {
      // Verificar tamaño una vez más por seguridad
      const fileSizeMB = this.croppedFile.size / (1024 * 1024);
      if (fileSizeMB > 2) { // Si de alguna manera sigue siendo muy grande
        this.snackBar.open('La imagen aún es demasiado grande. Se procesará de nuevo', 'Entendido', {
          duration: 3000
        });
        
        // Crear una imagen desde el base64 actual para reprocesar
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          // Reducir a 600px como máximo en cualquier dimensión
          const maxDim = 600;
          let width = img.width;
          let height = img.height;
          
          if (width > maxDim || height > maxDim) {
            const ratio = Math.min(maxDim / width, maxDim / height);
            width = Math.floor(width * ratio);
            height = Math.floor(height * ratio);
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            // Comprimir con calidad baja para asegurar tamaño pequeño
            const finalBase64 = canvas.toDataURL('image/jpeg', 0.5);
            this.croppedImage = finalBase64;
            
            const blob = base64ToFile(finalBase64);
            this.croppedFile = new File([blob], 'animal_foto.jpg', {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            
            // Ahora sí enviamos
            this.dialogRef.close({
              file: this.croppedFile,
              preview: this.croppedImage
            });
          }
        };
        
        img.src = this.croppedImage;
        return;
      }
      
      // Si el tamaño es adecuado, enviar directamente
      this.dialogRef.close({
        file: this.croppedFile,
        preview: this.croppedImage
      });
    } else {
      this.snackBar.open('Por favor, selecciona y recorta una imagen primero', 'Cerrar', {
        duration: 3000
      });
    }
  }

  cancelPhoto(): void {
    this.dialogRef.close();
  }
}