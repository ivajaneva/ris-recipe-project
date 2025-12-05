package vaja1.ris.vaja1Ris.services;

import org.apache.pdfbox.pdmodel.PDPageContentStream;
import java.io.IOException;

public class PdfLayoutUtil {
    public static final float MARGIN = 50;
    public static final float LINE_SPACING = 15;

    public static void drawLine(PDPageContentStream content, float startX, float y, float endX) throws IOException{
        content.moveTo(startX, y);
        content.lineTo(endX, y);
        content.stroke();
    }
    public static float sectionSpacing(float y){
        return y - 25;
    }

    public static float lineSpacing(float y){
        return y - 15;
    }
}
